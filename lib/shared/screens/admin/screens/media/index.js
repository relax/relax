import * as mediaActions from 'actions/media';

import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {getMimeTypes} from 'helpers/mime-types';
import {bindActionCreators} from 'redux';
import {pushState} from 'redux-router';
import {dataConnect} from 'relate-js';

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
      fragments: Media.fragments,
      variablesTypes: {
        media: {
          sort: 'String',
          order: 'String',
          search: 'String',
          s: 'String',
          filters: '[Filter]'
        }
      },
      initialVariables: {
        media: {
          sort: props.sort,
          order: props.order,
          search: 'name',
          s: props.search,
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
    changeMediaDisplay: PropTypes.func.isRequired
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
      this.updateMedia(nextProps);
    }
  }

  updateMedia (props) {
    const {relate, sort, order, search, filter} = props;
    const mediaVariables = {
      sort,
      order,
      search: 'name',
      s: search
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

    relate.setVariables({
      media: mediaVariables
    });
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
    this.context.store.dispatch(pushState(null, location, query));
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
      changeMediaDisplay
    } = this.props;
    return (
      <Media
        {...this.state}
        media={media}
        mediaCount={mediaCount}
        uploadMediaFiles={uploadMediaFiles}
        uploadsVisible={uploadsVisible}
        searchChange={this.searchChange}
        location={location}
        sort={sort}
        order={order}
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
