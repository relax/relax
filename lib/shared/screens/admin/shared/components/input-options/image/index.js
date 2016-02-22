import * as mediaActions from '../../client/actions/media';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ImagePicker from './image-picker';

@connect(
  (state) => ({
    mediaItems: state.media.singles
  }),
  (dispatch) => ({
    ...bindActionCreators(mediaActions, dispatch)
  })
)
export default class ImagePickerContainer extends Component {
  static fragments = ImagePicker.fragments;

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mediaItems: PropTypes.object.isRequired,
    getMediaItem: PropTypes.func.isRequired,
    type: React.PropTypes.string
  };

  getInitState () {
    return {
      mounted: false,
      calcWidth: 200,
      selector: false
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
    this.setState({
      selector: true
    });
  }

  closeSelector () {
    this.setState({
      selector: false
    });
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
