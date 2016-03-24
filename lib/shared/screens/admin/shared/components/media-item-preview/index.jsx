import Component from 'components/component';
import Image from 'components/image';
import React, {PropTypes} from 'react';
import {getMediaType} from 'helpers/mime-types';

export default class MediaItemPreview extends Component {
  static fragments = {
    mediaItem: {
      _id: 1,
      type: 1,
      thumbnail: 1,
      url: 1,
      name: 1
    }
  };

  static propTypes = {
    mediaItem: PropTypes.object.isRequired,
    useThumbnail: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    useThumbnail: false,
    width: 100,
    height: 100
  };

  render () {
    const {mediaItem} = this.props;
    const type = getMediaType(mediaItem.type);
    let result;

    if (type === 'image') {
      result = this.renderImageType();
    } else if (type === 'favicon') {
      result = this.renderFaviconType();
    } else if (type === 'video') {
      result = this.renderVideoType();
    } else if (type === 'audio') {
      result = this.renderAudioType();
    }

    return result;
  }

  renderImageType () {
    const {mediaItem, width, height, useThumbnail} = this.props;
    let result;

    if (useThumbnail) {
      result = (
        <img
          src={`/${mediaItem.thumbnail}`}
          width={width}
          height={height}
        />
      );
    } else {
      result = (
        <Image
          id={mediaItem._id}
          width={width}
          height={height}
        />
      );
    }

    return result;
  }

  renderFaviconType () {
    const {mediaItem} = this.props;
    return (
      <img
        src={`/${mediaItem.url}`}
        style={{
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }}
      />
    );
  }

  renderVideoType () {
    const {mediaItem} = this.props;
    return (
      <div>
        <i className='nc-icon-outline media-1_play-69'></i>
        <span>{mediaItem.name}</span>
      </div>
    );
  }

  renderAudioType () {
    const {mediaItem} = this.props;
    return (
      <div>
        <i className='nc-icon-outline media-1_volume-98'></i>
        <span>{mediaItem.name}</span>
      </div>
    );
  }
}
