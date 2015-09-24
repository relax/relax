import {Component} from 'relax-framework';
import List from './list';
import Grid from './grid';
import React from 'react';
import Upload from '../../../upload';
import Filter from '../../../filter';
import AlertBox from '../../../alert-box';
import Lightbox from '../../../lightbox';
import cx from 'classnames';

import mediaStore from '../../../../client/stores/media';
import mediaActions from '../../../../client/actions/media';

export default class MediaManager extends Component {
  getInitialState () {
    return {
      display: 'list',
      media: this.context.media,
      upload: false,
      selected: [],
      removing: false
    };
  }

  getInitialCollections () {
    return {
      media: mediaStore.getCollection()
    };
  }

  onSuccess (file, mediaItem, progressFinal) {
    mediaActions.add(mediaItem);
  }

  listClick (event) {
    event.preventDefault();
    this.setState({
      display: 'list'
    });
  }

  gridClick (event) {
    event.preventDefault();
    this.setState({
      display: 'grid'
    });
  }

  onSelect (id) {
    var index = this.state.selected.indexOf(id);

    if (index === -1) {
      this.state.selected.push(id);
    } else {
      this.state.selected.splice(index, 1);
    }
    this.setState({
      selected: this.state.selected
    });
  }

  removeSelected (event) {
    event.preventDefault();
    this.setState({
      removing: true
    });
  }

  cancelRemove (event) {
    event.preventDefault();
    this.setState({
      removing: false
    });
  }

  confirmRemove (event) {
    event.preventDefault();
    mediaActions.removeBulk(this.state.selected);
    this.setState({
      removing: false,
      selected: []
    });
  }

  openUpload (event) {
    event.preventDefault();
    this.setState({
      upload: true
    });
  }

  closeUpload () {
    this.setState({
      upload: false
    });
  }

  renderItems () {
    if (this.state.display === 'list') {
      return (
        <List media={this.state.media} selected={this.state.selected} onSelect={this.onSelect.bind(this)} />
      );
    } else if (this.state.display === 'grid') {
      return (
        <Grid media={this.state.media} selected={this.state.selected} onSelect={this.onSelect.bind(this)} />
      );
    }
  }

  renderSelectedMenu () {
    if (this.state.selected.length > 0) {
      let str = this.state.selected.length+' items selected ';
      return (
        <AlertBox level='warning'>
          {str}
          <a href='#' className='alert' onClick={this.removeSelected.bind(this)}>Remove them</a>
        </AlertBox>
      );
    }
  }

  renderLightbox () {
    if (this.state.upload) {
      return (
        <Lightbox title='Upload media' onClose={this.closeUpload.bind(this)}>
          <Upload action='/api/media/upload' acceptedFiles='image/*' success={this.onSuccess.bind(this)} />
        </Lightbox>
      );
    }
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove the selected media elements?';
      return (
        <Lightbox className='small' header={false}>
          <div className='big centered'>{label}</div>
          <div className='centered space-above'>
            <a className='button button-grey margined' href='#' onClick={this.cancelRemove.bind(this)}>No, abort!</a>
            <a className='button button-alert margined' href='#' onClick={this.confirmRemove.bind(this)}>Yes, delete them!</a>
          </div>
        </Lightbox>
      );
    }
  }

  render () {
    return (
      <div className='admin-media'>
        <div className='filter-menu'>
          <span className='admin-title'>Media</span>
          <a href='#' className={cx('button-clean', this.state.display === 'list' && 'active')} onClick={this.listClick.bind(this)}>
            <i className='material-icons'>list</i>
            <span>List</span>
          </a>
          <a href='#' className={cx('button-clean', this.state.display === 'grid' && 'active')} onClick={this.gridClick.bind(this)}>
            <i className='material-icons'>grid_on</i>
            <span>Grid</span>
          </a>
          <a href='#' className='button-clean' onClick={this.openUpload.bind(this)}>
            <i className='material-icons'>file_upload</i>
            <span>Upload media</span>
          </a>
          <Filter
            sorts={[{label: 'Date', property: '_id'}, {label: 'Size', property: 'filesize'}, {label: 'Dimensions', property: 'dimension'}]}
            url='/admin/media'
            search='name'
          />
        </div>
        <div className='admin-scrollable'>
          {this.renderSelectedMenu()}
          {this.renderItems()}
        </div>
        {this.renderLightbox()}
        {this.renderRemoving()}
      </div>
    );
  }
}

MediaManager.contextTypes = {
  media: React.PropTypes.array.isRequired
};
