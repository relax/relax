import cx from 'classnames';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../a';

export default class Entry extends Component {
  static fragments = {
    page: {
      _id: 1,
      state: 1,
      date: 1,
      title: 1
    }
  }

  static propTypes = {
    page: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render () {
    const page = this.props.page;
    const editLink = '/admin/page/' + page._id;
    const published = page.state === 'published';
    const date = 'Created ' + moment(page.date).format('MMMM Do YYYY');

    return (
      <A href={editLink} key={page._id} className='entry' afterClick={this.props.onClose}>
        <div className={cx('icon-part', !published && 'unpublished')}>
          <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
        </div>
        <div className='info-part'>
          <div className='title'>{page.title}</div>
          <div className='under-title'>{date}</div>
        </div>
      </A>
    );
  }
}
