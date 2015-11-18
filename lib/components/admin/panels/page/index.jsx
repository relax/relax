import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Animate from '../../../animate';
import Breadcrumbs from '../../../breadcrumbs';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import Utils from '../../../../utils';

export default class Page extends Component {
  static fragments = {
    page: {
      _id: 1,
      __v: 1,
      title: 1,
      slug: 1,
      state: 1,
      date: 1,
      updatedDate: 1,
      createdBy: {
        _id: 1,
        email: 1,
        name: 1
      },
      updatedBy: {
        _id: 1,
        email: 1,
        name: 1
      }
    }
  }

  static propTypes = {
    page: React.PropTypes.object,
    user: React.PropTypes.object,
    breadcrumbs: React.PropTypes.array,
    isNew: React.PropTypes.bool,
    errors: React.PropTypes.any,
    isSlugValid: React.PropTypes.bool,
    validateSlug: React.PropTypes.func,
    onChange: React.PropTypes.func,
    saving: React.PropTypes.bool,
    onUpdate: React.PropTypes.func,
    onPublish: React.PropTypes.func,
    onUnpublish: React.PropTypes.func,
    onSaveDraft: React.PropTypes.func,
    onRevisions: React.PropTypes.func,
    savingLabel: React.PropTypes.string,
    error: React.PropTypes.bool,
    success: React.PropTypes.bool
  }

  render () {
    const {isNew} = this.props;
    let result;

    if (!isNew && this.props.errors) {
      result = <NotFound />;
    } else {
      const published = this.props.page.state === 'published';
      const createdDate = isNew ? 'Creating' : moment(this.props.page.date).format('MMMM Do YYYY');

      const createdUser = isNew ? this.props.user : this.props.page.createdBy;
      const updatedUser = isNew ? this.props.user : this.props.page.updatedBy;

      const breadcrumbs = this.props.breadcrumbs.slice();
      breadcrumbs.push({
        label: this.props.page.title
      });

      result = (
        <div className='admin-page with-admin-sidebar'>
          <div className='content'>
            <div className='filter-menu'>
              <Breadcrumbs data={breadcrumbs} />
              {!isNew &&
              <A href='/admin/pages/new' className='button-clean'>
                <i className='material-icons'>library_add</i>
                <span>Add new page</span>
              </A>}
            </div>
            <div className='admin-scrollable'>
              <div className='white-options list'>
                <TitleSlug
                  title={this.props.page.title}
                  slug={this.props.page.slug}
                  isSlugValid={this.props.isSlugValid}
                  validateSlug={this.props.validateSlug}
                  onChange={this.props.onChange}
                  titlePlaceholder='Page title'
                  slugPlaceholder='page-slug'
                />
              </div>
            </div>
          </div>
          <div className='menu'>
            <div className='infos'>
              <div className={cx('info', !published && 'alerted')}>
                <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
                <span>State</span>
                <div>{this.props.page.state}</div>
              </div>
              <div className={cx('info', isNew && 'alerted')}>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'><img src={Utils.getGravatarImage(createdUser && createdUser.email || 'default', 40)} /></span>
                <span>Created by</span>
                <div>{createdUser && createdUser.name || 'removed user'}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'><img src={Utils.getGravatarImage(updatedUser && updatedUser.email || 'default', 40)} /></span>
                <span>Last update by</span>
                <div>{updatedUser && updatedUser.name || 'removed user'}</div>
              </div>
            </div>
            {this.renderlinks()}
            {this.renderActions()}
            {this.renderSaving()}
          </div>
        </div>
      );
    }

    return result;
  }

  renderlinks () {
    if (!this.props.isNew) {
      const buildLink = '/admin/page/' + this.props.page._id;
      const viewLink = '/' + this.props.page.slug;
      const revisions = this.props.page.__v;
      return (
        <div className='links'>
          <A className='link' href={buildLink}>
            <i className='material-icons'>build</i>
            <span>Build</span>
          </A>
          <a className='link' href={viewLink} target='_blank'>
            <i className='material-icons'>link</i>
            <span>View</span>
          </a>
          {revisions > 0 &&
            <a href='#' className='link' onClick={this.props.onRevisions}>
              <i className='material-icons'>history</i>
              <span>{'Revisions (' + revisions + ')'}</span>
            </a>
          }
        </div>
      );
    }
  }

  renderActions () {
    let result;
    if (this.props.page.state === 'published') {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.props.saving && 'disabled')} onClick={this.props.onUpdate}>Update</div>
          <div className={cx('button button-grey margined', this.props.saving && 'disabled')} onClick={this.props.onUnpublish}>Unpublish</div>
        </div>
      );
    } else {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.props.saving && 'disabled')} onClick={this.props.onPublish}>Publish</div>
          <div className={cx('button button-grey margined', this.props.saving && 'disabled')} onClick={this.props.onSaveDraft}>Save draft</div>
        </div>
      );
    }
    return result;
  }

  renderSaving () {
    let result;
    if (this.props.saving) {
      result = (
        <Animate transition='slideDownIn' key='saving'>
          <div className='saving'>
            <Spinner />
            <span>{this.props.savingLabel}</span>
          </div>
        </Animate>
      );
    } else if (this.props.errors) {
      result = (
        <Animate transition='slideDownIn' key='error'>
          <div className='error' ref='success'>
            <i className='material-icons'>error_outline</i>
            <span>Something went bad!</span>
          </div>
        </Animate>
      );
    } else if (this.props.success) {
      result = (
        <Animate transition='slideDownIn' key='success'>
          <div className='success' ref='success'>
            <i className='material-icons'>check</i>
            <span>All good!</span>
          </div>
        </Animate>
      );
    }
    return result;
  }
}
