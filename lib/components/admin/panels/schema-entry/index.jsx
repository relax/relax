import {Component, Router} from 'relax-framework';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Velocity from 'velocity-animate';
import Utils from '../../../../utils';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';
import OptionsList from '../../../options-list';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../data-types/options-map';
import RevisionsOverlay from '../../revisions-overlay';

import schemaEntriesStoreFactory from '../../../../client/stores/schema-entries';
import schemaEntriesActionsFactory from '../../../../client/actions/schema-entries';

export default class SchemaEntry extends Component {
  getInitialState () {
    schemaEntriesStoreFactory(this.context.schema.slug);
    this.schemaEntriesActions = schemaEntriesActionsFactory(this.context.schema.slug);

    let defaults = {
      _title: 'New',
      _slug: 'new',
      _state: 'draft'
    };

    if (this.context.schema && this.context.schema.properties && this.context.schema.properties.length > 0) {
      forEach(this.context.schema.properties, (property) => {
        if (property.default !== null) {
          defaults[property.id] = property.default;
        }
      });
    }

    return {
      schema: this.context.schema,
      schemaEntry: cloneDeep(this.context.schemaEntry) || defaults,
      new: !(this.context.schemaEntry && this.context.schemaEntry._id),
      breadcrumbs: this.context.breadcrumbs
    };
  }

  componentDidUpdate () {
    if ((!this.state.new && !this.context.schemaEntry) ||
        (this.state.new && this.context.schemaEntry)) {
      this.setState(this.getInitialState());
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  onSubmit (data) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    let action, routerOptions;
    if (this.state.new) {
      data._createdBy = this.context.user._id;
      action = this.schemaEntriesActions.add;
      routerOptions = {trigger: true};
    } else {
      action = this.schemaEntriesActions.update;
      routerOptions = {trigger: false, replace: true};
    }

    data._updatedBy = this.context.user._id;

    action(data)
      .then((schemaEntry) => {
        this.setState({
          saving: false,
          schemaEntry,
          success: true,
          error: false,
          new: false
        });
        Router.prototype.navigate('/admin/schema/'+this.context.schema.slug+'/'+schemaEntry._slug, routerOptions);
        this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
      })
      .catch((error) => {
        this.setState({
          saving: false,
          error: true
        });
      });
  }

  successOut () {
    clearTimeout(this.successTimeout);

    var dom = React.findDOMNode(this.refs.success);
    const transition = 'transition.slideDownOut';
    Velocity(dom, transition, {
      duration: 400,
      display: null
    }).then(() => {
      this.setState({
        success: false
      });
    });
  }

  onSaveDraft () {
    this.setState({
      saving: true,
      savingLabel: 'Saving draft'
    });

    this.onSubmit(this.state.schemaEntry);
  }

  onUpdate () {
    this.setState({
      saving: true,
      savingLabel: 'Updating entry'
    });

    this.onSubmit(this.state.schemaEntry);
  }

  onPublish () {
    let clone = cloneDeep(this.state.schemaEntry);
    clone._state = 'published';
    clone._publishedDate = new Date();

    this.setState({
      saving: true,
      savingLabel: 'Publishing'
    });

    this.onSubmit(clone);
  }

  onUnpublish () {
    let clone = cloneDeep(this.state.schemaEntry);
    clone._state = 'draft';

    this.setState({
      saving: true,
      savingLabel: 'Saving and unpublishing'
    });

    this.onSubmit(clone);
  }

  onOverlap () {
    let clone = cloneDeep(this.state.schemaEntry);
    clone._overlap = true;

    this.setState({
      saving: true,
      savingLabel: 'Overlaping schema template'
    });

    this.onSubmit(clone);
  }

  onRevertTemplate () {
    let clone = cloneDeep(this.state.schemaEntry);
    clone._overlap = false;
    clone._data = [];

    this.setState({
      saving: true,
      savingLabel: 'Reverting to schema template'
    });

    this.onSubmit(clone);
  }

  onFieldChange (id, value) {
    this.state.schemaEntry[id] = value;

    this.setState({
      schemaEntry: this.state.schemaEntry
    });
  }

  onChange (values) {
    if (values.title) {
      this.state.breadcrumbs[2].label = values.title;
      this.state.schemaEntry._title = values.title;
    }
    if (values.slug) {
      this.state.schemaEntry._slug = values.slug;
    }

    this.setState({
      schemaEntry: this.state.schemaEntry,
      breadcrumbs: this.state.breadcrumbs
    });
  }

  validateSlug (slug) {
    if (!this.state.new) {
      if (this.context.schemaEntry._slug === slug) {
        return false;
      }
    }

    if (slug === 'new') {
      return true;
    }

    return this.schemaEntriesActions.validateSlug(slug);
  }

  onRestore (__v) {
    this.context.closeOverlay();

    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    this.schemaEntriesActions
      .restore({
        _id: this.state.schemaEntry._id,
        __v
      })
      .then((schemaEntry) => {
        this.state.breadcrumbs[2].label = schemaEntry._title;
        this.setState({
          saving: false,
          schemaEntry,
          success: true,
          error: false,
          new: false,
          breadcrumbs: this.state.breadcrumbs
        });
        Router.prototype.navigate('/admin/schema/'+this.context.schema.slug+'/'+schemaEntry._slug, {trigger: false, replace: true});
        this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
      })
      .catch(() => {
        this.setState({
          success: false
        });
      });
  }

  onRevisions (event) {
    event.preventDefault();

    const schemaEntry = this.context.schemaEntry;
    let current = {
      _id: {
        _id: schemaEntry._id,
        __v: schemaEntry.__v
      },
      date: schemaEntry._updatedDate,
      user: schemaEntry._updatedBy,
      title: schemaEntry._title
    };

    this.context.addOverlay(
      <RevisionsOverlay current={current} onRestore={this.onRestore.bind(this)} />
    );
  }

  renderProperty (property) {
    // check dependencies
    let show = true;
    if (property.dependencies && property.dependencies.length > 0) {
      forEach(property.dependencies, dependency => {
        dependency.value = dependency.value === 'true' ? true : dependency.value;
        if (this.state.schemaEntry[dependency.id] !== dependency.value) {
          show = false;
          return false;
        }
      });
    }

    if (show && TypesOptionsMap[property.type]) {
      let Option = TypesOptionsMap[property.type];
      let props = clone(TypesOptionsDefaultProps[property.type] || {});
      merge(props, property.props || {});

      let value = this.state.schemaEntry[property.id];

      return (
        <div className='option' key={property.id}>
          <div className='label'>
            <span>{property.title}</span>
            {property.required && <span className='sub-label'>*</span>}
          </div>
          <Option onChange={this.onFieldChange.bind(this, property.id)} value={value} {...props} OptionsList={OptionsList} />
        </div>
      );
    }
  }

  renderProperties () {
    if (this.state.schema.properties && this.state.schema.properties.length > 0) {
      return this.state.schema.properties.map(this.renderProperty, this);
    }
  }

  renderBuildLinks () {
    if (this.state.schemaEntry._overlap) {
      const buildLink = '/admin/schema/'+this.context.schema.slug+'/'+this.state.schemaEntry._slug+'/single';
      return (
        <div>
          <A className='link' href={buildLink}>
            <i className='material-icons'>build</i>
            <span>Build page</span>
          </A>
          <a href='#' className='link' onClick={this.onRevertTemplate.bind(this)}>
            <i className='material-icons'>backspace</i>
            <span>Revert to template</span>
          </a>
        </div>
      );
    } else {
      return (
        <a href='#' className='link' onClick={this.onOverlap.bind(this)}>
          <i className='material-icons'>merge_type</i>
          <span>Overlap template</span>
        </a>
      );
    }
  }

  renderlinks () {
    if (!this.state.new) {
      const viewLink = '/'+this.context.schema.slug+'/'+this.state.schemaEntry._slug;
      const revisions = this.state.schemaEntry.__v;
      return (
        <div className='links'>
          {this.renderBuildLinks()}
          <a className='link' href={viewLink} target='_blank'>
            <i className='material-icons'>link</i>
            <span>View</span>
          </a>
          {revisions > 0 &&
            <a href='#' className='link' onClick={this.onRevisions.bind(this)}>
              <i className='material-icons'>history</i>
              <span>{'Revisions ('+revisions+')'}</span>
            </a>
          }
        </div>
      );
    }
  }

  renderActions () {
    if (this.state.schemaEntry._state === 'published') {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onUpdate.bind(this)}>Update</div>
          <div className={cx('button button-grey margined', this.state.saving && 'disabled')} onClick={this.onUnpublish.bind(this)}>Unpublish</div>
        </div>
      );
    } else {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onPublish.bind(this)}>Publish</div>
          <div className={cx('button button-grey margined', this.state.saving && 'disabled')} onClick={this.onSaveDraft.bind(this)}>Save draft</div>
        </div>
      );
    }
  }

  renderSaving () {
    if (this.state.saving) {
      return (
        <Animate transition='slideDownIn' key='saving'>
          <div className='saving'>
            <Spinner />
            <span>{this.state.savingLabel}</span>
          </div>
        </Animate>
      );
    } else if (this.state.error) {
      return (
        <Animate transition='slideDownIn'  key='error'>
          <div className='error' ref='success'>
            <i className='material-icons'>error_outline</i>
            <span>Something went bad!</span>
          </div>
        </Animate>
      );
    } else if (this.state.success) {
      return (
        <Animate transition='slideDownIn'  key='success'>
          <div className='success' ref='success'>
            <i className='material-icons'>check</i>
            <span>All good!</span>
          </div>
        </Animate>
      );
    }
  }

  render () {
    const published = this.state.schemaEntry._state === 'published';
    const createdDate = this.state.new ? 'Creating' : moment(this.state.schemaEntry._date).format('MMMM Do YYYY');
    const publishedDate = !published ? 'Unpublished' : moment(this.state.schemaEntry._publishedDate).format('MMMM Do YYYY');

    const createdUser = this.state.new ? this.context.user : this.state.schemaEntry._createdBy;
    const updatedUser = this.state.new ? this.context.user : this.state.schemaEntry._updatedBy;

    return (
      <div className='admin-schema-entry with-admin-sidebar'>
        <div className='content'>
          <div className='filter-menu'>
            <Breadcrumbs data={this.state.breadcrumbs} />
            {!this.state.new &&
              <A href={'/admin/schema/'+this.context.schema.slug+'/new'} className='button-clean'>
                <i className='material-icons'>library_add</i>
                <span>Add new entry</span>
              </A>
            }
          </div>
          <div className='admin-scrollable'>
            <div className='white-options list'>
              <TitleSlug
                title={this.state.schemaEntry._title}
                slug={this.state.schemaEntry._slug}
                validateSlug={this.validateSlug.bind(this)}
                onChange={this.onChange.bind(this)}
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
              <div>{this.state.schemaEntry._state}</div>
            </div>
            <div className={cx('info', this.state.new && 'alerted')}>
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
}

SchemaEntry.contextTypes = {
  schema: React.PropTypes.object.isRequired,
  schemaEntry: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  closeOverlay: React.PropTypes.func.isRequired
};
