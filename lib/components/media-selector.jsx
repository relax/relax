import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import MediaItem from './media-item';
import Upload from './upload';

export default class MediaSelector extends Component {
  static fragments = MediaItem.fragments

  static propTypes = {
    selected: PropTypes.string,
    media: PropTypes.array.isRequired,
    onAddMedia: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired
  }

  imageClicked (id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onItemClick(id);
  }

  render () {
    // TODO `acceptedFiles` on `Upload` does not seem to be being used inside the `Upload` component
    return (
      <div className='media-selector'>
        <Upload acceptedFiles='image/*' onFile={this.props.onAddMedia}>
          {this.props.media.map(this.renderMediaItem, this)}
        </Upload>
      </div>
    );
  }

  renderMediaItem (item) {
    return (
      <a href='#' className={cx('ms-item', item._id === this.props.selected && 'selected')} key={item._id} onClick={this.imageClicked.bind(this, item._id)}>
        <MediaItem item={item} width='100' height='100' />
      </a>
    );
  }
}
