import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import utils from '../utils';
import Image from './image';

export default class MediaItem extends Component {
  static fragments = {
    media: {
      _id: 1,
      thumbnail: 1,
      url: 1,
      name: 1,
      type: 1
    }
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    useThumbnail: PropTypes.bool
  }

  static defaultProps = {
    useThumbnail: true
  }

  render () {
    let result = <span />;
    const type = utils.getMediaType(this.props.item.type);

    if (type === 'image') {
      if (this.props.useThumbnail) {
        result = (
          <img src={`/${this.props.item.thumbnail}`} width={this.props.width} height={this.props.height} />
        );
      } else {
        result = (
          <Image id={this.props.item._id} width={this.props.width} height={this.props.height} />
        );
      }
    } else if (type === 'favicon') {
      result = (
        <img src={this.props.item.url} style={{top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}} />
      );
    } else if (type === 'video') {
      result = (
        <div className='not-image'>
          <i className='material-icons'>videocam</i>
          <span>{this.props.item.name}</span>
        </div>
      );
    } else if (type === 'audio') {
      result = (
        <div className='not-image'>
          <i className='material-icons'>music_note</i>
          <span>{this.props.item.name}</span>
        </div>
      );
    }

    return <div className='media-item'>{result}</div>;
  }
}
