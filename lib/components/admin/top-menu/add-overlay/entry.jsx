import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import cx from 'classnames';
import A from '../../../a';

export default class Entry extends Component {
  render () {
    const page = this.props.page;
    const editLink = '/admin/page/'+page.slug;
    const published = page.state === 'published';
    const date = 'Created ' + moment(page.date).format('MMMM Do YYYY');

    return (
      <A href={editLink} key={page._id} className='entry' afterClick={this.context.onClose}>
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

Entry.contextTypes = {
  onClose: React.PropTypes.func.isRequired
};

Entry.propTypes = {
  page: React.PropTypes.object.isRequired
};
