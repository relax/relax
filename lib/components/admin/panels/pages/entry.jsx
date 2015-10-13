import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import cx from 'classnames';
import A from '../../../a';

export default class Entry extends Component {
  static fragments = {
    pages: {
      _id: 1,
      title: 1,
      slug: 1,
      state: 1,
      date: 1
    }
  }

  getInitialState () {
    return {
      removing: false
    };
  }

  render () {
    const page = this.props.page;

    let editLink = '/admin/pages/'+page.slug;
    let buildLink = '/admin/page/'+page.slug;
    let viewLink = '/'+page.slug;
    const published = page.state === 'published';
    let date = 'Created - ' + moment(page.date).format('MMMM Do YYYY');

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
            <a href='#'>
              <i className='material-icons'>content_copy</i>
              <span>Duplicate</span>
            </a>
            <a href='#'>
              <i className='material-icons'>remove_circle_outline</i>
              <span>Remove</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  page: React.PropTypes.object.isRequired
};
