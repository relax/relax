import cx from 'classnames';
import forEach from 'lodash.foreach';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Animate from '../../../animate';
import Breadcrumbs from '../../../breadcrumbs';
import OptionsList from '../../../options-list';
import Spinner from '../../../spinner';
import TitleSlug from '../../../title-slug';
import Utils from '../../../../utils';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../data-types/options-map';

export default class SchemaEntry extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1,
      slug: 1,
      properties: 1
    },
    schemaEntry: {
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
      },
      properties: 1
    }
  }

  static propTypes = {
    schema: PropTypes.object,
    schemaEntry: PropTypes.object,
    user: PropTypes.object,
    breadcrumbs: PropTypes.array,
    isNew: PropTypes.bool,
    errors: PropTypes.any,
    isSlugValid: PropTypes.bool,
    validateSlug: PropTypes.func,
    onChange: PropTypes.func,
    changeSchemaEntryProperty: PropTypes.func,
    saving: PropTypes.bool,
    onUpdate: PropTypes.func,
    onPublish: PropTypes.func,
    onUnpublish: PropTypes.func,
    onSaveDraft: PropTypes.func,
    onRevisions: PropTypes.func,
    onRevertTemplate: PropTypes.func,
    onOverlap: PropTypes.func,
    savingLabel: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool
  }

  render () {
    const published = this.props.schemaEntry.state === 'published';
    const createdDate = this.props.isNew ? 'Creating' : moment(this.props.schemaEntry.date).format('MMMM Do YYYY');
    const publishedDate = !published ? 'Unpublished' : moment(this.props.schemaEntry.publishedDate).format('MMMM Do YYYY');
    const newLink = '/admin/schema/' + this.props.schema._id + '/new';

    const createdUser = this.props.isNew ? this.props.user : this.props.schemaEntry.createdBy;
    const updatedUser = this.props.isNew ? this.props.user : this.props.schemaEntry.updatedBy;

    const breadcrumbs = [...this.props.breadcrumbs, {
      label: this.props.schema.title,
      type: 'schema',
      link: '/admin/schema/' + this.props.schema._id
    }, {
      label: this.props.schemaEntry.title
    }];

    return (
      <div className='admin-schema-entry with-admin-sidebar'>
        <div className='content'>
          <div className='filter-menu'>
            <Breadcrumbs data={breadcrumbs} />
            {!this.props.isNew &&
              <A href={newLink} className='button-clean'>
                <i className='material-icons'>library_add</i>
                <span>Add new entry</span>
              </A>
            }
          </div>
          <div className='admin-scrollable'>
            <div className='white-options list'>
              <TitleSlug
                title={this.props.schemaEntry.title}
                slug={this.props.schemaEntry.slug}
                isSlugValid={this.props.isSlugValid}
                validateSlug={this.props.validateSlug}
                onChange={this.props.onChange}
                titlePlaceholder={this.props.schema.title + ' entry title'}
                slugPlaceholder={this.props.schema.slug + '-entry-slug'}
              />
              {this.renderProperties()}
            </div>
          </div>
        </div>
        <div className='menu'>
          <div className='infos'>
            <div className={cx('info', !published && 'alerted')}>
              <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
              <span>State</span>
              <div>{this.props.schemaEntry.state}</div>
            </div>
            <div className={cx('info', this.props.isNew && 'alerted')}>
              <i className='material-icons'>today</i>
              <span>Created at</span>
              <div>{createdDate}</div>
            </div>
            <div className={cx('info', !published && 'alerted')}>
              <i className='material-icons'>event</i>
              <span>Published at</span>
              <div>{publishedDate}</div>
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

  renderlinks () {
    if (!this.props.isNew) {
      const viewLink = '/' + this.props.schema.slug + '/' + this.props.schemaEntry.slug;
      const revisions = this.props.schemaEntry.__v;
      return (
        <div className='links'>
          {this.renderBuildLinks()}
          <a className='link' href={viewLink} target='_blank'>
            <i className='material-icons'>link</i>
            <span>View</span>
          </a>
          {revisions > 0 &&
            <a href='#' className='link' onClick={this.props.onRevisions.bind(this)}>
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
    if (this.props.schemaEntry.state === 'published') {
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

  renderBuildLinks () {
    let result;
    if (this.props.schemaEntry._overlap) {
      const buildLink = '/admin/schema/' + this.props.schema._id + '/' + this.props.schemaEntry._id + '/single';
      result = (
        <div>
          <A className='link' href={buildLink}>
            <i className='material-icons'>build</i>
            <span>Build page</span>
          </A>
          <a href='#' className='link' onClick={this.props.onRevertTemplate}>
            <i className='material-icons'>backspace</i>
            <span>Revert to template</span>
          </a>
        </div>
      );
    } else {
      result = (
        <a href='#' className='link' onClick={this.props.onOverlap}>
          <i className='material-icons'>merge_type</i>
          <span>Overlap template</span>
        </a>
      );
    }
    return result;
  }

  renderProperties () {
    if (this.props.schema.properties && this.props.schema.properties.length > 0) {
      return this.props.schema.properties.map(this.renderProperty, this);
    }
  }

  renderProperty (property) {
    // check dependencies
    let show = true;
    if (property.dependencies && property.dependencies.length > 0) {
      forEach(property.dependencies, dependency => {
        dependency.value = dependency.value === 'true' ? true : dependency.value;
        if (this.props.schemaEntry[dependency.id] !== dependency.value) {
          show = false;
          return false;
        }
      });
    }

    if (show && TypesOptionsMap[property.type]) {
      const Option = TypesOptionsMap[property.type];
      const props = Object.assign({}, TypesOptionsDefaultProps[property.type] || {}, property.props || {});
      const value = this.props.schemaEntry.properties && this.props.schemaEntry.properties[property.id];

      return (
        <div className='option' key={property.id}>
          <div className='label'>
            <span>{property.title}</span>
            {property.required && <span className='sub-label'>*</span>}
          </div>
          <Option onChange={this.props.changeSchemaEntryProperty.bind(this, property.id)} value={value} {...props} OptionsList={OptionsList} />
        </div>
      );
    }
  }
}
