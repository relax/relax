import {Component, Router} from 'relax-framework';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Velocity from 'velocity-animate';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';
import OptionsList from '../../../options-list';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../data-types/options-map';

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

    let action;
    if (this.state.new) {
      action = this.schemaEntriesActions.add;
    } else {
      action = this.schemaEntriesActions.update;
    }

    action(data)
      .then((schemaEntry) => {
        this.setState({
          saving: false,
          schemaEntry,
          success: true,
          error: false,
          new: false
        });
        Router.prototype.navigate('/admin/schema/'+this.context.schema.slug+'/'+schemaEntry._slug, {trigger: false, replace: true});
        this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
        this.context.schemaEntry = cloneDeep(schemaEntry);
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

  renderlinks () {
    if (!this.state.new) {
      const buildLink = '/admin/schema/'+this.context.schema.slug+'/'+this.state.schemaEntry._slug;
      const viewLink = '/'+this.context.schema.slug+'/'+this.state.schemaEntry._slug;
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

    return (
      <div className='admin-schema-entry with-admin-sidebar'>
        <div className='content'>
          <div className='filter-menu'>
            <Breadcrumbs data={this.state.breadcrumbs} />
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
  breadcrumbs: React.PropTypes.array.isRequired
};
