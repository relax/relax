import moment from 'moment';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import MediaItem from '../../media-item';

export default class Selected extends Component {
  static fragments = {
    mediaItem: {
      _id: 1,
      date: 1,
      name: 1,
      dimension: {
        width: 1,
        height: 1
      },
      size: 1
    }
  }

  static propTypes = {
    mediaItem: PropTypes.object,
    removeMediaItem: PropTypes.func.isRequired
  }

  render () {
    const {mediaItem} = this.props;
    let result;
    if (mediaItem) {
      const date = moment(mediaItem.date).format('Do MMMM YYYY');
      result = (
        <div className='selected-media'>
          <div className='wrapper'>
            <div className='image-part'>
              <MediaItem item={mediaItem} width='100' height='100' />
            </div>
            <div className='info-part'>
              <div className='title'>{mediaItem.name}</div>
              <div className='under-title'>{date}</div>
              {mediaItem.dimension && mediaItem.dimension.width &&
                <div className='under-title'>
                  {`${mediaItem.dimension.width}x${mediaItem.dimension.height}`}
                </div>
              }
              <div className='under-title'>{mediaItem.size}</div>
              <div className='remove-selected' onClick={this.props.removeMediaItem.bind(null, mediaItem._id)}>remove</div>
            </div>
          </div>
        </div>
      );
    } else {
      result = (
        <span></span>
      );
    }

    return result;
  }
}
