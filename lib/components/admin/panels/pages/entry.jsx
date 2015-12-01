import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Lightbox from '../../../lightbox';

export default class Entry extends Component {
  static fragments = {
    page: {
      _id: 1,
      title: 1,
      slug: 1,
      state: 1,
      date: 1
    }
  }

  static propTypes = {
    removePage: React.PropTypes.func.isRequired,
    duplicatePage: React.PropTypes.func.isRequired,
    page: React.PropTypes.object.isRequired
  }

  getInitState () {
    return {
      removing: false
    };
  }

  removePage (event) {
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
    this.props.removePage(this.constructor.fragments, this.props.page).done();
    this.setState({
      removing: false
    });
  }

  duplicatePage (event) {
    event.preventDefault();
    this.props.duplicatePage(this.constructor.fragments, this.props.page._id).done();
  }

  render () {
    const page = this.props.page;

    const editLink = '/admin/pages/' + page._id;
    const buildLink = '/admin/page/' + page._id;
    const viewLink = '/' + page.slug;
    const published = page.state === 'published';
    const date = 'Created - ' + moment(page.date).format('MMMM Do YYYY');

    return (
      <div key={page._id} className='entry'>
        <div className={cx('icon-part', !published && 'unpublished')}>
          <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{page.title}</span>
          </div>
          <div className='under-title'>{date}</div>
          <div className='under-title'>{page.state}</div>
          <div className='actions'>
            <A href={editLink}>
              <i className='material-icons'>mode_edit</i>
              <span>Edit</span>
            </A>
            <A href={buildLink}>
              <i className='material-icons'>build</i>
              <span>Build</span>
            </A>
            <a href={viewLink} target='_blank'>
              <i className='material-icons'>link</i>
              <span>View</span>
            </a>
            <a href='#' onClick={this.duplicatePage.bind(this)}>
              <i className='material-icons'>content_copy</i>
              <span>Duplicate</span>
            </a>
            <a href='#' onClick={this.removePage.bind(this)}>
              <i className='material-icons'>remove_circle_outline</i>
              <span>Remove</span>
            </a>
          </div>
        </div>
        {this.renderRemoving()}
      </div>
    );
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove ' + this.props.page.title + ' page?';
      const label1 = 'You\'ll loose this page\'s data forever!';
      return (
        <Lightbox className='small' header={false}>
          <div className='big centered'>{label}</div>
          <div className='medium centered'>{label1}</div>
          <div className='centered space-above'>
            <a className='button button-grey margined' href='#' onClick={this.cancelRemove.bind(this)}>No, abort!</a>
            <a className='button button-alert margined' href='#' onClick={this.confirmRemove.bind(this)}>Yes, delete it!</a>
          </div>
        </Lightbox>
      );
    }
  }
}
