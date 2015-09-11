import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import cx from 'classnames';
import A from '../../../a';
import cloneDeep from 'lodash.clonedeep';
import Q from 'q';
import Lightbox from '../../../lightbox';

import pageActions from '../../../../client/actions/page';

export default class Entry extends Component {
  getInitialState () {
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
    pageActions.remove(this.props.page._id);
    this.setState({
      removing: false
    });
  }

  resolveSlug (slug, it) {
    var resultSlug = slug + (it > 0 ? '-'+it : '');

    return Q()
      .then(() => pageActions.validateSlug(resultSlug))
      .then((response) => {
        var slugValid = !response;

        if (slugValid) {
          return resultSlug;
        } else {
          return this.resolveSlug(slug, it+1);
        }
      });
  }

  duplicatePage (event) {
    event.preventDefault();
    var clonePage = cloneDeep(this.props.page);
    delete clonePage._id;
    delete clonePage.date;
    delete clonePage.actions;
    clonePage.title += ' (copy)';
    clonePage.slug += '-copy';
    clonePage.state = 'draft';

    this.resolveSlug(clonePage.slug, 0).then((slug) => {
      clonePage.slug = slug;
      pageActions.add(clonePage);
    });
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove '+this.props.page.title+' page?';
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
}

Entry.propTypes = {
  page: React.PropTypes.object.isRequired
};
