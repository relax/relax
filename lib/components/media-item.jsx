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
        <img src={this.props.item.url} />
      );
    } else if (type === 'video') {
      result = (
        <i className='material-icons'>videocam</i>
      );
    } else if (type === 'sound') {
      result = (
        <i className='material-icons'>music_note</i>
      );
    }

    return result;
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
