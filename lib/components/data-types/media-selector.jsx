import cx from 'classnames';
import moment from 'moment';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Combobox from './combobox';
import MediaItem from '../media-item';
import Upload from '../upload';

export default class MediaSelector extends Component {
  static fragments = mergeFragments(MediaItem.fragments, {
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
  })

  static propTypes = {
    selected: PropTypes.string,
    media: PropTypes.array.isRequired,
    onAddMedia: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    mediaItem: PropTypes.object,
    changeView: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired,
    sort: PropTypes.object.isRequired
  }

  imageClicked (id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onItemClick(id);
  }

  onSearchChange (event) {
    this.props.changeSearch(event.target.value);
  }

  onChangeView (view) {
    this.props.changeView(view);
  }

  sortChange (key, value) {
    this.props.changeSort(key, value);
  }

  render () {
    const {media} = this.props;
    return (
      <div className='modal-content media-selector'>
        <div className='modal-menu'>
          <div className='modal-header'>Media selector</div>
          <div className='content-scrollable'>
            <GeminiScrollbar autoshow>
              <div className='option'>
                <div className='label'>Sort by</div>
                <Combobox
                  labels={['Date', 'Size', 'Dimensions']}
                  values={['_id', 'filesize', 'dimension']}
                  value={this.props.sort.property}
                  className='medium-combobox'
                  onChange={this.sortChange.bind(this, 'property')}
                />
                <Combobox
                  labels={['Asc', 'Desc']}
                  values={['asc', 'desc']}
                  value={this.props.sort.order}
                  className='small-combobox'
                  onChange={this.sortChange.bind(this, 'order')}
                />
              </div>
            </GeminiScrollbar>
          </div>
          <div className='selected-media'>
            {this.renderSelected()}
          </div>
          <div className='modal-done'>
            <div className='button button-primary' onClick={this.props.onClose}>DONE</div>
          </div>
        </div>
        <div className='modal-content-area'>
          <div className='search-bar'>
            <span className={cx('view-switch', this.props.view === 'small' && 'active')} onClick={this.onChangeView.bind(this, 'small')}>
              <i className='material-icons'>photo_size_select_large</i>
            </span>
            <span className={cx('view-switch', this.props.view === 'big' && 'active')} onClick={this.onChangeView.bind(this, 'big')}>
              <i className='material-icons'>photo_size_select_actual</i>
            </span>
            <div className='search-part'>
              <div className='search-input'>
                <i className='material-icons'>search</i>
                <input type='text' value={this.props.search} onChange={::this.onSearchChange} />
              </div>
            </div>
          </div>
          <div className={cx('content-area-scrollable', this.props.view)} key={this.props.view}>
            <GeminiScrollbar autoshow>
              <Upload acceptedFiles='image/*' onFile={this.props.onAddMedia}>
                {media.map(this.renderMediaItem, this)}
              </Upload>
            </GeminiScrollbar>
          </div>
        </div>
      </div>
    );
  }

  renderSelected () {
    const {mediaItem} = this.props;
    if (mediaItem) {
      const date = moment(mediaItem.date).format('Do MMMM YYYY');
      return (
        <div className='wrapper'>
          <div className='image-part'>
            <MediaItem item={mediaItem} width='100' height='100' />
          </div>
          <div className='info-part'>
            <div className='title'>{mediaItem.name}</div>
            <div className='under-title'>{date}</div>
            {mediaItem.dimension &&
              <div className='under-title'>
                {`${mediaItem.dimension.width}x${mediaItem.dimension.height}`}
              </div>
            }
            <div className='under-title'>{mediaItem.size}</div>
          </div>
        </div>
      );
    }
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
