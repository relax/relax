import React from 'react';
import {Component} from 'relax-framework';
import Image from './image';
import utils from '../utils';

export default class MediaItem extends Component {
  render () {
    let result = <span />;
    const type = utils.getMediaType(this.props.item.type);

    if (type === 'image') {
      if (this.props.useThumbnail) {
        result = (
          <img src={this.props.item.thumbnail} width={this.props.width} height={this.props.height} />
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

MediaItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  useThumbnail: React.PropTypes.bool
};

MediaItem.defaultProps = {
  useThumbnail: true
};
