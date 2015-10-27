import * as mediaActions from '../../client/actions/media';
import * as overlayActions from '../../client/actions/overlays';

import find from 'lodash.find';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import ImagePicker from '../../components/data-types/image-picker';
import Lightbox from '../../components/lightbox';
import MediaSelectorContainer from '../../containers/media-selector';

@connect(
  (state) => ({
    mediaItems: state.media.singles
  }),
  (dispatch) => ({
    ...bindActionCreators(mediaActions, dispatch),
    ...bindActionCreators(overlayActions, dispatch)
  })
)
export default class ImagePickerContainer extends Component {
  static fragments = ImagePicker.fragments

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    mediaItems: PropTypes.array.isRequired,
    getMediaItem: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  getInitialState () {
    return {
      mounted: false,
      calcWidth: 200
    };
  }

  componentDidMount () {
    this.updateMediaItem(this.props.value);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateMediaItem(nextProps.value);
    }
  }

  updateMediaItem (value) {
    if (value && value !== '') {
      this.props.getMediaItem(this.constructor.fragments, value);
    }
  }

  openSelector () {
    this.props.addOverlay('media-selector', (
      <Lightbox title='Select an image' onClose={::this.closeSelector}>
        <MediaSelectorContainer store={this.context.store} onChange={this.props.onChange} selected={this.props.value} />
      </Lightbox>
    ));
  }

  closeSelector () {
    this.props.closeOverlay('media-selector');
  }

  onMount (width) {
    this.setState({
      mounted: true,
      calcWidth: width
    });
  }

  render () {
    let mediaItem = null;
    if (this.props.value) {
      mediaItem = find(this.props.mediaItems, {_id: this.props.value});
    }

    return (
      <ImagePicker
        {...this.props}
        {...this.state}
        openSelector={::this.openSelector}
        onMount={::this.onMount}
        mediaItem={mediaItem}
      />
    );
  }
}
