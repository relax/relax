import {Component, Router} from 'relax-framework';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import Velocity from 'velocity-animate';
import cx from 'classnames';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Builder from './builder';
import TitleSlug from '../../../title-slug';
import Breadcrumbs from '../../../breadcrumbs';

import schemaActions from '../../../../client/actions/schema';

export default class SchemasManage extends Component {
  getInitialState () {
    let defaults = {
      title: 'New Schema',
      slug: 'new-schema',
      state: 'draft'
    };

    return {
      schema: cloneDeep(this.context.schema) || defaults,
      new: !(this.context.schema && this.context.schema._id),
      breadcrumbs: this.context.breadcrumbs
    };
  }

  componentWillUnmount () {
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
      action = schemaActions.add;
    } else {
      action = schemaActions.update;
    }

    action(data)
      .then((schema) => {
        this.setState({
          saving: false,
          schema,
          success: true,
          error: false,
          new: false
        });
        Router.prototype.navigate('/admin/schemas/'+schema.slug, {trigger: false, replace: true});
        this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
        this.context.schema = cloneDeep(schema);
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

  onSave () {
    this.setState({
      saving: true,
      savingLabel: 'Saving changes'
    });

    this.onSubmit(this.state.schema);
  }

  onCreate () {
    this.setState({
      saving: true,
      savingLabel: 'Creating schema'
    });

    this.onSubmit(this.state.schema);
  }

  onPropertiesChange (properties) {
    this.state.schema.properties = properties;
    this.setState({
      schema: this.state.schema
    });
  }

  onChange (values) {
    if (values.title) {
      this.state.breadcrumbs[1].label = values.title;
      this.state.schema.title = values.title;
    }
    if (values.slug) {
      this.state.schema.slug = values.slug;
    }

    this.setState({
      schema: this.state.schema,
      breadcrumbs: this.state.breadcrumbs
    });
  }

  validateSlug (slug) {
    if (!this.state.new) {
      if (this.context.schema.slug === slug) {
        return false;
      }
    }

    if (slug === 'new') {
      return true;
    }

    return schemaActions.validateSlug(slug);
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

  renderlinks () {
    if (!this.state.new) {
      const buildTemplateLink = '/admin/schemas/'+this.state.schema.slug+'/template';
      const entriesLink = '/admin/schema/'+this.state.schema.slug;
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
        </div>
      );
    }
  }

  renderActions () {
    if (this.state.new) {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onCreate.bind(this)}>Create schema</div>
        </div>
      );
    } else {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onSave.bind(this)}>Save changes</div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='admin-schemas-new with-admin-sidebar'>
        <div className='content'>
          <div className='filter-menu'>
            <Breadcrumbs data={this.context.breadcrumbs} />
          </div>
          <div className='admin-scrollable'>
            <div className='list white-options'>
              <TitleSlug title={this.state.schema.title} slug={this.state.schema.slug} validateSlug={this.validateSlug.bind(this)} onChange={this.onChange.bind(this)} />
              <Builder value={this.state.schema.properties || []} onChange={this.onPropertiesChange.bind(this)} />
            </div>
          </div>
        </div>
        <div className='menu'>
          <div className='infos'>
            <div className={cx('info', this.state.new && 'alerted')}>
              <i className='material-icons'>{!this.state.new ? 'cloud_queue' : 'cloud_off'}</i>
              <span>Status</span>
              <div>{this.state.new ? 'creating' : 'editing'}</div>
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

SchemasManage.contextTypes = {
  breadcrumbs: React.PropTypes.array.isRequired,
  schema: React.PropTypes.object
};
