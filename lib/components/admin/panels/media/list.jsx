import moment from 'moment';
import React from 'react';
import {Component, mergeFragments} from 'relax-framework';

import MediaItem from '../../../media-item';

export default class MediaList extends Component {
  static fragments = mergeFragments(MediaItem.fragments)

  static propTypes = {
    media: React.PropTypes.array.isRequired,
    selected: React.PropTypes.array,
    onSelect: React.PropTypes.func
  }

  static defaultProps = {
    selected: []
  }

  render () {
    return (
      <div className='list'>
        {this.renderMedia()}
      </div>
    );
  }

  renderItem (data) {
    var date = moment(data.date).format('Do MMMM YYYY');
    var className = 'entry';

    if (this.props.selected.indexOf(data._id) !== -1) {
      className += ' active';
    }

    return (
      <div key={data._id} onClick={this.props.onSelect && this.props.onSelect.bind(null, data._id)} className={className}>
        <div className='image-part'>
          <MediaItem item={data} width={100} height={100} useThumbnail />
        </div>
        <div className='info-part'>
          <div className='title'>{data.name}</div>
          {data.dimension &&
            <div className='under-title'>
              {`${data.dimension.width}x${data.dimension.height}`}
            </div>
          }
          <div className='under-title'>{data.size}</div>
          <div className='under-title'>{date}</div>
        </div>
      </div>
    );
  }

  renderMedia () {
    var result;

    if (this.props.media.length > 0) {
      result = this.props.media.map(this.renderItem, this);
    } else {
      result = (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No media items added yet!</p>
            <p>You can add new media items on the upload media button above</p>
          </div>
        </div>
      );
    }

    return result;
  }
}
