import cx from 'classnames';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../../animate';
import MediaItem from '../../media-item';

export default class Uploads extends Component {
  static propTypes = {
    uploadedData: PropTypes.array.isRequired,
    closeUploads: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.string
  }

  imageClicked (id, event) {
    event.preventDefault();
    this.props.onItemClick(id);
  }

  render () {
    return (
      <div className='uploads-area'>
        <div className='uploads-top'>
          <span>Uploads</span>
          <i className='material-icons' onClick={this.props.closeUploads}>close</i>
        </div>
        <div className='uploads-items'>
          <GeminiScrollbar autoshow>
            {this.props.uploadedData.map(this.renderEntry, this)}
          </GeminiScrollbar>
        </div>
      </div>
    );
  }

  renderEntry (item) {
    let result;
    if (item.uploading) {
      // Uploading
      result = (
        <div className='item uploading' key={item.name}>
          {this.renderItemContent(item)}
          <span className='status'>
            <Animate key='uploading'>
              <i className='material-icons'>data_usage</i>
            </Animate>
          </span>
        </div>
      );
    } else {
      // Uploaded
      result = (
        <div className={cx('item uploaded', item._id === this.props.selected && 'selected')} key={item.name} onClick={this.imageClicked.bind(this, item._id)}>
          {this.renderItemContent(item)}
          <span className='status'>
            <Animate key='uploaded'>
              <i className='material-icons'>check</i>
            </Animate>
          </span>
        </div>
      );
    }
    return result;
  }

  renderItemContent (item) {
    return (
      <MediaItem item={item} width={70} height={70} useThumbnail />
    );
  }
}
