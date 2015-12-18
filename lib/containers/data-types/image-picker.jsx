import * as mediaActions from '../../client/actions/media';
import * as overlayActions from '../../client/actions/overlays';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import ImagePicker from '../../components/data-types/image-picker';
import MediaSelectorContainer from './media-selector';
import Modal from '../../components/modal';

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
    onChange: PropTypes.func.isRequired,
    mediaItems: PropTypes.object.isRequired,
    getMediaItem: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    type: React.PropTypes.string
  }

  getInitState () {
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
      <Modal onClose={::this.closeSelector}>
        <MediaSelectorContainer onChange={this.props.onChange} selected={this.props.value} onClose={::this.closeSelector} type={this.props.type} />
      </Modal>
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
    const mediaItem = this.props.mediaItems[this.props.value];

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
