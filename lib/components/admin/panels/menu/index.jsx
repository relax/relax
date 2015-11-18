import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component, mergeFragments} from 'relax-framework';

import A from '../../../a';
import Animate from '../../../animate';
import Breadcrumbs from '../../../breadcrumbs';
import Builder from './builder';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import {getGravatarImage} from '../../../../utils';

const menuDataFragment = {
  id: 1,
  type: 1,
  page: {
    _id: 1,
    title: 1
  },
  link: {
    label: 1,
    url: 1
  }
};

const menuUserFragment = {
  _id: 1,
  email: 1,
  name: 1
};

export default class Menu extends Component {
  static fragments = mergeFragments({
    menu: {
      _id: 1,
      title: 1,
      slug: 1,
      date: 1,
      updatedDate: 1,
      createdBy: {
        ...menuUserFragment
      },
      updatedBy: {
        ...menuUserFragment
      },
      data: {
        ...menuDataFragment,
        children: {
          ...menuDataFragment,
          children: {
            ...menuDataFragment
          }
        }
      }
    }
  }, Builder.fragments)

  static propTypes = {
    menu: React.PropTypes.object,
    user: React.PropTypes.object,
    errors: React.PropTypes.any,
    breadcrumbs: React.PropTypes.array,
    slug: React.PropTypes.string,
    isSlugValid: React.PropTypes.bool.isRequired,
    validateSlug: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    pages: React.PropTypes.array.isRequired,
    onDataChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool.isRequired,
    success: React.PropTypes.bool.isRequired,
    savingLabel: React.PropTypes.string.isRequired,
    error: React.PropTypes.bool.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func.isRequired,
    dnd: React.PropTypes.object.isRequired,
    dndActions: React.PropTypes.object.isRequired
  }

  isNew () {
    return !this.props.menu._id;
  }

  render () {
    const isNew = this.isNew();
    let result;

    if (!isNew && this.props.errors) {
      result = <NotFound />;
    } else {
      const createdDate = isNew ? 'Creating' : moment(this.props.menu.date).format('MMMM Do YYYY');
      const createdUser = isNew ? this.props.user : this.props.menu.createdBy;
      const updatedUser = isNew ? this.props.user : this.props.menu.updatedBy;

      const breadcrumbs = this.props.breadcrumbs.slice();
      breadcrumbs.push({
        label: this.props.menu.title
      });

      result = (
        <div className='admin-menu with-admin-sidebar'>
          <div className='content'>
            <div className='filter-menu'>
              <Breadcrumbs data={breadcrumbs} />
              {!isNew &&
              <A href='/admin/menus/new' className='button-clean'>
                <i className='material-icons'>library_add</i>
                <span>Add new menu</span>
              </A>}
            </div>
            <div className='admin-scrollable'>
              <div className='white-options list'>
                <TitleSlug
                  title={this.props.menu.title}
                  slug={this.props.menu.slug}
                  isSlugValid={this.props.isSlugValid}
                  validateSlug={this.props.validateSlug}
                  onChange={this.props.onChange}
                  titlePlaceholder='Menu title'
                  slugPlaceholder='menu-slug'
                />
                <Builder
                  data={this.props.menu.data}
                  pages={this.props.pages}
                  onChange={this.props.onDataChange}
                  dnd={this.props.dnd}
                  dndActions={this.props.dndActions}
                />
              </div>
            </div>
          </div>
          <div className='menu'>
            <div className='infos'>
              <div className={cx('info')}>
                <i className='material-icons'>menu</i>
                <span>Menu</span>
              </div>
              <div className={cx('info', isNew && 'alerted')}>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'><img src={getGravatarImage(createdUser && createdUser.email || 'default', 40)} /></span>
                <span>Created by</span>
                <div>{createdUser && createdUser.name || 'removed user'}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'><img src={getGravatarImage(updatedUser && updatedUser.email || 'default', 40)} /></span>
                <span>Last update by</span>
                <div>{updatedUser && updatedUser.name || 'removed user'}</div>
              </div>
            </div>
            {this.renderActions()}
            {this.renderSaving()}
          </div>
        </div>
      );
    }
    return result;
  }

  renderActions () {
    let result;
    if (!this.isNew()) {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.props.saving && 'disabled')} onClick={this.props.onUpdate}>Update</div>
        </div>
      );
    } else {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.props.saving && 'disabled')} onClick={this.props.onCreate}>Create</div>
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
    } else if (this.props.error) {
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
