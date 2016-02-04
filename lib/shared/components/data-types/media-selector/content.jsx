import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../../animate';
import MediaItem from '../../media-item';
import Upload from '../../upload';
import Uploads from './uploads';

export default class Content extends Component {
  static fragments = MediaItem.fragments

  static propTypes = {
    onAddMedia: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    media: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    uploadedData: PropTypes.array.isRequired,
    mimeTypes: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    closeUploads: PropTypes.func.isRequired
  }

  imageClicked (id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onItemClick(id);
  }

  render () {
    return (
      <Upload accept={this.props.mimeTypes.toString()} onFile={this.props.onAddMedia} disableClick infos>
        <Uploads
          uploadedData={this.props.uploadedData}
          closeUploads={this.props.closeUploads}
          onItemClick={this.props.onItemClick}
          selected={this.props.selected}
        />
        <div className={cx('content-area-scrollable', this.props.view, this.props.uploading && 'uploading')} key={this.props.view}>
          <div className='content'>
            {this.renderResults()}
          </div>
        </div>
      </Upload>
    );
  }

  renderResults () {
    const {media} = this.props;
    let result;

    if (this.props.loading) {
      result = (
        <Animate transition='slideUpIn' key='loading'>
          <div className='loading'></div>
        </Animate>
      );
    } else {
      if (media && media.length > 0) {
        result = (
          <Animate transition='slideUpIn' key='items'>
            <div>
              {media.map(this.renderMediaItem, this)}
            </div>
          </Animate>
        );
      } else {
        result = (
          <Animate transition='slideUpIn' key='no-items'>
            <div className='no-results'>
              <span>No results found</span>
            </div>
          </Animate>
        );
      }
    }
    return result;
  }

  renderMediaItem (item) {
    const width = this.props.view === 'small' ? 100 : 200;
    const height = this.props.view === 'small' ? 100 : 112;
    return (
      <a href='#' className={cx('ms-item', item._id === this.props.selected && 'selected')} key={item._id} onClick={this.imageClicked.bind(this, item._id)}>
        <MediaItem item={item} width={width} height={height} useThumbnail={this.props.view === 'small'} />
      </a>
    );
  }
}
