import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import AlertBox from '../../../alert-box';
import Filter from '../../../filter';
import Grid from './grid';
import Lightbox from '../../../lightbox';
import List from './list';
import Pagination from '../../../pagination';
import Upload from '../../../upload';

export default class MediaManager extends Component {
  static fragments = mergeFragments(List.fragments, {
    mediaCount: {
      count: 1
    }
  })

  static propTypes = {
    display: PropTypes.string,
    selected: PropTypes.string,
    removing: PropTypes.boolean,
    upload: PropTypes.boolean,
    query: PropTypes.object,
    count: PropTypes.number,
    media: PropTypes.array.isRequired,
    uploadedMedia: PropTypes.array.isRequired,
    onAddMedia: PropTypes.func.isRequired,
    onGridClick: PropTypes.func.isRequired,
    onListClick: PropTypes.func.isRequired,
    onOpenUpload: PropTypes.func.isRequired,
    onCloseUpload: PropTypes.func.isRequired,
    onCancelRemove: PropTypes.func.isRequired,
    onConfirmRemove: PropTypes.func.isRequired,
    onRemoveSelected: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='admin-media'>
        <div className='filter-menu'>
          <span className='admin-title'>Media</span>
          <a href='#' className={cx('button-clean', this.props.display === 'list' && 'active')} onClick={this.props.onListClick}>
            <i className='material-icons'>list</i>
            <span>List</span>
          </a>
          <a href='#' className={cx('button-clean', this.props.display === 'grid' && 'active')} onClick={this.props.onGridClick}>
            <i className='material-icons'>grid_on</i>
            <span>Grid</span>
          </a>
          <a href='#' className='button-clean' onClick={this.props.onOpenUpload}>
            <i className='material-icons'>file_upload</i>
            <span>Upload media</span>
          </a>
          <Filter
            sorts={[{label: 'Date', property: '_id'}, {label: 'Size', property: 'filesize'}, {label: 'Dimensions', property: 'dimension'}]}
            url='/admin/media'
            search='name'
            query={this.props.query}
            history={this.props.history}
          />
        </div>
        <div className='admin-scrollable'>
          {this.renderSelectedMenu()}
          {this.renderItems()}
          <Pagination url='/admin/media' query={this.props.query} count={this.props.count} />
        </div>
        {this.renderLightbox()}
        {this.renderRemoving()}
      </div>
    );
  }

  renderItems () {
    if (this.props.display === 'list') {
      return (
        <List media={this.props.media} selected={this.props.selected} onSelect={this.props.onSelect} />
      );
    } else if (this.props.display === 'grid') {
      return (
        <Grid media={this.props.media} selected={this.props.selected} onSelect={this.props.onSelect} />
      );
    }
  }

  renderSelectedMenu () {
    if (this.props.selected.length > 0) {
      const str = this.props.selected.length + ' items selected ';
      return (
        <AlertBox level='warning'>
          {str}
          <a href='#' className='alert' onClick={this.props.onRemoveSelected}>Remove them</a>
        </AlertBox>
      );
    }
  }

  renderLightbox () {
    if (this.props.upload) {
      return (
        <Lightbox title='Upload media' onClose={this.props.onCloseUpload}>
          <Upload acceptedFiles='image/*' onFile={this.props.onAddMedia}>
            <List media={this.props.uploadedMedia} />
          </Upload>
        </Lightbox>
      );
    }
  }

  renderRemoving () {
    if (this.props.removing) {
      const label = 'Are you sure you want to remove the selected media elements?';
      return (
        <Lightbox className='small' header={false}>
          <div className='big centered'>{label}</div>
          <div className='centered space-above'>
            <a className='button button-grey margined' href='#' onClick={this.props.onCancelRemove}>No, abort!</a>
            <a className='button button-alert margined' href='#' onClick={this.props.onConfirmRemove}>Yes, delete them!</a>
          </div>
        </Lightbox>
      );
    }
  }
}
