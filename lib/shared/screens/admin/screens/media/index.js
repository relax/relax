import * as mediaActions from 'actions/media';

import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import getLazyFilters from 'helpers/get-lazy-load-filters';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {getMimeTypes} from 'helpers/mime-types';
import {bindActionCreators} from 'redux';
import {push} from 'redux-router';
import {dataConnect, mergeFragments} from 'relate-js';

import Media from './components/media.jsx';

@dataConnect(
  (state) => ({
    uploadsVisible: state.media.uploads.length > 0,
    display: state.media.display,
    location: state.router.location,
    sort: state.router.location.query.sort || '_id',
    order: state.router.location.query.order || 'desc',
    search: state.router.location.query.s || '',
    filter: state.router.location.query.filter || 'all'
  }),
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  (props) => {
    const filter = props.filter;
    let filters = [];
    if (filter !== 'all') {
      let type = getMimeTypes(filter);
      let op = 'in';
      if (!type) {
        op = 'eq';
        type = filter;
      }
      filters = [{
        property: 'type',
        op: {
          [op]: type
        }
      }];
    }

    return {
      fragments: mergeFragments(Media.fragments, {
        media: {
          _id: 1,
          filesize: 1,
          date: 1,
          dimension: {
            width: 1,
            height: 1
          }
        }
      }),
      variablesTypes: {
        media: {
          sort: 'String',
          order: 'String',
          search: 'String',
          s: 'String',
          limit: 'Int',
          filters: '[Filter]'
        }
      },
      initialVariables: {
        media: {
          sort: props.sort,
          order: props.order,
          search: 'name',
          s: props.search,
          limit: 20,
          filters
        }
      },
      mutations: {
        addMedia: [
          {
            type: 'PREPEND',
            field: 'media'
          },
          {
            type: 'INCREMENT',
            field: 'mediaCount'
          }
        ]
      }
    };
  }
)
export default class MediaContainer extends Component {
  static propTypes = {
    media: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    changeMediaDisplay: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    media: []
  };

  getInitState () {
    return {
      search: this.props.search,
      selected: [],
      deleteConfirm: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sort !== this.props.sort ||
        nextProps.order !== this.props.order ||
        nextProps.search !== this.props.search ||
        nextProps.filter !== this.props.filter) {
      const {relate} = nextProps;
      relate.setVariables({
        media: this.getMediaVariables(nextProps, 20)
      });
    }
  }

  @bind
  loadMore () {
    const {loading, relate} = this.props;
    if (!loading && relate.hasMore) {
      const {media, sort, order} = this.props;
      const variables = this.getMediaVariables(this.props, 10);

      variables.filters = variables.filters || [];
      variables.filters = [...variables.filters, ...getLazyFilters({
        items: media,
        sort,
        order
      })];

      relate.loadMore({media: variables}, 'media', 10);
    }
  }

  getMediaVariables (props, limit) {
    const {sort, order, search, filter} = props;
    const mediaVariables = {
      sort,
      order,
      search: 'name',
      s: search,
      limit
    };

    if (filter !== 'all') {
      let type = getMimeTypes(filter);
      let op = 'in';
      if (!type) {
        op = 'eq';
        type = filter;
      }
      mediaVariables.filters = [{
        property: 'type',
        op: {
          [op]: type
        }
      }];
    }

    return mediaVariables;
  }

  @bind
  toggleMediaSelection (id) {
    const {selected} = this.state;
    const index = selected.indexOf(id);

    if (index === -1) {
      this.setState({
        selected: [...selected, id]
      });
    } else {
      const newSelected = selected.slice(0);
      newSelected.splice(index, 1);
      this.setState({
        selected: newSelected
      });
    }
  }

  @bind
  unselectAll () {
    this.setState({
      selected: []
    });
  }

  @bind
  searchChange (search) {
    this.setState({
      search
    });
    this.updateSearch();
  }

  @debounce(300)
  updateSearch () {
    const {location} = this.props;
    const query = Object.assign({}, location.query, {
      s: this.state.search
    });
    this.context.store.dispatch(push(location, query));
  }

  @bind
  onRemoveSelected () {
    this.setState({
      deleteConfirm: true
    });
  }

  @bind
  cancelRemoveSelected () {
    this.setState({
      deleteConfirm: false
    });
  }

  @bind
  removeSelected () {
    this.props
      .removeMediaItems(this.state.selected)
      .then(() => {
        this.setState({
          selected: [],
          deleteConfirm: false
        });
      });
  }

  render () {
    const {
      media,
      mediaCount,
      uploadMediaFiles,
      uploadsVisible,
      location,
      sort,
      order,
      display,
      changeMediaDisplay,
      loading,
      loadingMore
    } = this.props;
    return (
      <Media
        {...this.state}
        media={media}
        mediaCount={mediaCount}
        loadMore={this.loadMore}
        uploadMediaFiles={uploadMediaFiles}
        uploadsVisible={uploadsVisible}
        searchChange={this.searchChange}
        location={location}
        sort={sort}
        order={order}
        loading={loading}
        loadingMore={loadingMore}
        toggleMediaSelection={this.toggleMediaSelection}
        unselectAll={this.unselectAll}
        display={display}
        changeMediaDisplay={changeMediaDisplay}
        onRemoveSelected={this.onRemoveSelected}
        cancelRemoveSelected={this.cancelRemoveSelected}
        removeSelected={this.removeSelected}
      />
    );
  }
}
