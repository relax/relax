import * as adminActions from '../../client/actions/admin';
import * as mediaActions from '../../client/actions/media';

import debounce from 'lodash.debounce';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import MediaSelector from '../../components/data-types/media-selector';
import {getQueryVariables} from '../../decorators/query-props';
import {getMimeTypes} from '../../helpers/mime-types';

@connect(
  (state) => ({
    media: state.media.data.items,
    mediaSingles: state.media.singles,
    uploadedData: state.media.uploadedData,
    errors: state.menu.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(mediaActions, dispatch),
    ...bindActionCreators(adminActions, dispatch)
  })
)
export default class MediaSelectorContainer extends Component {
  static fragments = MediaSelector.fragments

  static propTypes = {
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    media: PropTypes.array.isRequired,
    mediaSingles: PropTypes.array.isRequired,
    getAdmin: PropTypes.func.isRequired,
    addMedia: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    getMediaItem: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    uploadedData: PropTypes.array.isRequired,
    removeMediaItem: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: 'image'
  }

  getInitState () {
    this.mimeTypes = getMimeTypes(this.props.type);
    this.fetchDebounce = debounce(::this.fetchMediaItems, 1000);
    return {
      selected: this.props.selected,
      view: 'small',
      search: '',
      sort: {
        property: '_id',
        order: 'desc'
      },
      filterMime: 'all',
      uploading: false,
      loading: true
    };
  }

  componentDidMount () {
    const vars = {
      media: {
        ...getQueryVariables({
          sort: this.state.sort.property,
          order: this.state.sort.order,
          filters: [
            {
              property: 'type',
              op: {
                in: this.mimeTypes
              }
            }
          ]
        })
      }
    };
    const fragments = {
      media: this.constructor.fragments.media
    };

    if (this.state.selected) {
      vars.mediaItem = {
        id: {
          value: this.state.selected,
          type: 'String!'
        }
      };
      fragments.mediaItem = this.constructor.fragments.mediaItem;
    }

    this.props
      .getAdmin(buildQueryAndVariables(
        fragments,
        vars
      ))
      .done(() => {
        this.setState({
          loading: false
        });
      });
  }

  fetchMediaItems () {
    const op = {};

    this.setState({
      loading: true
    });

    if (this.state.filterMime === 'all') {
      op.in = this.mimeTypes;
    } else {
      op.eq = this.state.filterMime;
    }

    const vars = {
      media: {
        ...getQueryVariables({
          sort: this.state.sort.property,
          order: this.state.sort.order,
          search: 'name',
          s: this.state.search,
          filters: [
            {
              property: 'type',
              op
            }
          ]
        })
      }
    };
    const fragments = {
      media: this.constructor.fragments.media
    };

    this.props
      .getAdmin(buildQueryAndVariables(
        fragments,
        vars
      ))
      .done(() => {
        this.setState({
          loading: false,
          uploading: this.state.uploading && this.props.uploadedData.length > 0
        });
      });
  }

  changeMime (filterMime) {
    this.setState({
      filterMime
    }, () => {
      this.fetchMediaItems();
    });
  }

  onItemClick (id) {
    this.props.onChange(id);
    this.setState({
      selected: id
    });
    this.props.getMediaItem({media: this.constructor.fragments.mediaItem}, id);
  }

  async onAddMedia (file, fileInfo) {
    this.setState({
      uploading: true
    });

    await this.props.addMedia({media: this.constructor.fragments.media}, file, fileInfo);
  }

  changeView (view) {
    this.setState({
      view
    });
  }

  changeSort (key, value) {
    this.setState({
      sort: Object.assign({}, this.state.sort, {
        [key]: value
      })
    }, () => {
      this.fetchMediaItems();
    });
  }

  changeSearch (search) {
    this.setState({
      search
    });
    this.fetchDebounce();
  }

  closeUploads () {
    this.setState({
      uploading: false
    }, () => {
      if (this.props.uploadedData.length > 0) {
        this.fetchMediaItems();
      }
    });
  }

  render () {
    const mediaItem = this.props.mediaSingles[this.state.selected];

    return (
      <MediaSelector
        {...this.state}
        media={this.props.media}
        mediaItem={mediaItem}
        onAddMedia={::this.onAddMedia}
        onItemClick={::this.onItemClick}
        onClose={this.props.onClose}
        removeMediaItem={this.props.removeMediaItem}
        uploadedData={this.props.uploadedData}
        closeUploads={::this.closeUploads}
        changeView={::this.changeView}
        changeSort={::this.changeSort}
        changeMime={::this.changeMime}
        changeSearch={::this.changeSearch}
        mimeTypes={this.mimeTypes}
      />
    );
  }
}
