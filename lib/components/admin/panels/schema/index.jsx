import cx from 'classnames';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Animate from '../../../animate';
import Breadcrumbs from '../../../breadcrumbs';
import Builder from './builder';
import NotFound from '../not-found';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import {getGravatarImage} from '../../../../utils';

export default class SchemasManage extends Component {
  static fragments = {
    schema: {
      _id: 1,
      __v: 1,
      title: 1,
      slug: 1,
      date: 1,
      updatedDate: 1,
      properties: 1,
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
    schema: PropTypes.object,
    user: PropTypes.object,
    breadcrumbs: PropTypes.array,
    isNew: PropTypes.bool,
    errors: PropTypes.any,
    onRevisions: PropTypes.func,
    status: PropTypes.oneOf(['saving', 'error', 'success']),
    savingLabel: PropTypes.string,
    isSlugValid: PropTypes.boolean,
    onCreate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    validateSlug: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onPropertiesChange: PropTypes.func.isRequired
  }

  render () {
    const {isNew} = this.props;
    let result;

    if (!isNew && this.props.errors) {
      result = <NotFound />;
    } else {
      const createdDate = isNew ? 'Creating' : moment(this.props.schema.date).format('MMMM Do YYYY');
      const updatedDate = isNew ? 'Creating' : moment(this.props.schema.updatedDate).format('MMMM Do YYYY');

      const createdUser = isNew ? this.props.user : this.props.schema.createdBy;
      const updatedUser = isNew ? this.props.user : this.props.schema.updatedBy;

      const breadcrumbs = this.props.breadcrumbs.slice();
      breadcrumbs.push({
        label: this.props.schema.title
      });

      result = (
        <div className='admin-schemas-new with-admin-sidebar'>
          <div className='content'>
            <div className='filter-menu'>
              <Breadcrumbs data={breadcrumbs} />
            </div>
            <div className='admin-scrollable'>
              <div className='list white-options'>
                <TitleSlug
                  title={this.props.schema.title}
                  slug={this.props.schema.slug}
                  isSlugValid={this.props.isSlugValid}
                  validateSlug={this.props.validateSlug}
                  onChange={this.props.onChange}
                  titlePlaceholder='Schema title'
                  slugPlaceholder='schema-slug'
                />
                <Builder value={this.props.schema.properties || []} onChange={this.props.onPropertiesChange} />
              </div>
            </div>
          </div>
          <div className='menu'>
            <div className='infos'>
              <div className={cx('info', isNew && 'alerted')}>
                <i className='material-icons'>{!isNew ? 'cloud_queue' : 'cloud_off'}</i>
                <span>Status</span>
                <div>{isNew ? 'creating' : 'editing'}</div>
              </div>
              <div className={cx('info', isNew && 'alerted')}>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className={cx('info', isNew && 'alerted')}>
                <i className='material-icons'>event</i>
                <span>Updated at</span>
                <div>{updatedDate}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'>
                  <img src={getGravatarImage(createdUser && createdUser.email || 'default', 40)} />
                </span>
                <span>Created by</span>
                <div>{createdUser && createdUser.name || 'removed user'}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'>
                  <img src={getGravatarImage(updatedUser && updatedUser.email || 'default', 40)} />
                </span>
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

  renderSaving () {
    let result;
    if (this.props.status === 'saving') {
      result = (
        <Animate transition='slideDownIn' key='saving'>
          <div className='saving'>
            <Spinner />
            <span>{this.props.savingLabel}</span>
          </div>
        </Animate>
      );
    } else if (this.props.status === 'error') {
      result = (
        <Animate transition='slideDownIn' key='error'>
          <div className='error' ref='success'>
            <i className='material-icons'>error_outline</i>
            <span>Something went bad!</span>
          </div>
        </Animate>
      );
    } else if (this.props.status === 'success') {
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

  renderActions () {
    let result;
    if (this.props.isNew) {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.props.status === 'saving' && 'disabled')} onClick={this.props.onCreate}>Create schema</div>
        </div>
      );
    } else {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.props.status === 'saving' && 'disabled')} onClick={this.props.onSave}>Save changes</div>
        </div>
      );
    }
    return result;
  }

  renderlinks () {
    if (!this.props.isNew) {
      const buildTemplateLink = '/admin/schemas/' + this.props.schema.slug + '/template';
      const entriesLink = '/admin/schema/' + this.props.schema.slug;
      const revisions = this.props.schema.__v;
      return (
        <div className='links'>
          <A className='link' href={buildTemplateLink}>
            <i className='material-icons'>build</i>
            <span>Build Template</span>
          </A>
          <A className='link' href={entriesLink}>
            <i className='material-icons'>list</i>
            <span>Entries</span>
          </A>
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
}
