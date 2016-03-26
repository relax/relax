import * as mediaActions from 'actions/media';

import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {pushState} from 'redux-router';
import {dataConnect} from 'relate-js';

import Media from './components/media.jsx';

@dataConnect(
  (state) => ({
    uploadsVisible: state.media.uploads.length > 0,
    sort: state.router.location.query.sort || '_id',
    order: state.router.location.query.order || 'desc',
    search: state.router.location.query.s || ''
  }),
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  (props) => ({
    fragments: Media.fragments,
    variablesTypes: {
      media: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String'
      }
    },
    initialVariables: {
      media: {
        sort: props.sort,
        order: props.order,
        search: 'name',
        s: props.search
      }
    },
    mutations: {
      addMedia: [
        {
          type: 'PREPEND',
          field: 'media'
        }
      ]
    }
  })
)
export default class MediaContainer extends Component {
  static propTypes = {
    media: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    media: []
  };

  getInitState () {
    return {
      search: this.props.search
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sort !== this.props.sort ||
        nextProps.order !== this.props.order ||
        nextProps.search !== this.props.search) {
      this.props.relate.setVariables({
        media: {
          sort: nextProps.sort,
          order: nextProps.order,
          search: 'name',
          s: nextProps.search
        }
      });
    }
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

  render () {
    const {media, mediaCount, uploadMediaFiles, uploadsVisible} = this.props;
    const {search} = this.state;
    return (
      <Media
        media={media}
        mediaCount={mediaCount}
        uploadMediaFiles={uploadMediaFiles}
        uploadsVisible={uploadsVisible}
        search={search}
        searchChange={this.searchChange}
      />
    );
  }
}
