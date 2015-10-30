import * as schemaActions from '../../client/actions/schema';

import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Schema from '../../components/admin/panels/schema';

@connect(
  (state) => ({
    schema: state.schema.data,
    isSlugValid: state.schema.isSlugValid,
    errors: state.schema.errors
  }),
  (dispatch) => bindActionCreators(schemaActions, dispatch)
)
export default class SchemaContainer extends Component {
  static fragments = Schema.fragments

  static panelSettings = {
    activePanelType: 'schema',
    breadcrumbs: [
      {
        label: 'Schemas',
        type: 'schemas',
        link: '/admin/schemas'
      }
    ]
  }

  static propTypes = {
    schema: PropTypes.object,
    user: PropTypes.object,
    slug: PropTypes.string,
    changeSchemaFields: PropTypes.func,
    addSchema: PropTypes.func.isRequired,
    validateSchemaSlug: PropTypes.func.isRequired,
    updateSchema: PropTypes.func.isRequired,
    changeSchemaToDefault: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.slug !== 'new' && nextProps.slug === 'new') {
      this.props.changeSchemaToDefault();
    }
  }

  componentWillUnmount () {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  onSubmit (schemaProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitSchema = cloneDeep(schemaProps);

    let action;

    if (this.isNew()) {
      submitSchema.createdBy = this.props.user._id;
      action = this.props.addSchema;
    } else {
      submitSchema.createdBy = submitSchema.createdBy._id;
      action = this.props.updateSchema;
    }

    submitSchema.updatedBy = this.props.user._id;

    action(this.constructor.fragments, submitSchema)
      .then(() => {
        this.setState({
          status: 'success'
        });
        history.pushState({}, '', `/admin/schemas/${submitSchema.slug}`);
        this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
      })
      .catch((error) => {
        this.setState({
          status: 'error'
        });
      });
  }

  onSuccessOut () {
    clearTimeout(this.successTimeout);
    const dom = React.findDOMNode(this.refs.success);

    if (dom) {
      const transition = 'transition.slideDownOut';
      Velocity(dom, transition, {
        duration: 400,
        display: null
      }).then(() => {
        this.setState({
          status: null
        });
      });
    }
  }

  onSave () {
    this.setState({
      status: 'saving',
      savingLabel: 'Saving schema'
    });

    this.onSubmit(this.props.schema);
  }

  onCreate () {
    this.setState({
      status: 'saving',
      savingLabel: 'Creating schema'
    });

    this.onSubmit(this.props.schema);
  }

  onChange (values) {
    this.props.changeSchemaFields(merge({}, this.props.schema, values));
  }

  isNew () {
    return !this.props.schema._id;
  }

  async validateSlug (slug, schemaId = this.props.schema._id) {
    return await this.props.validateSchemaSlug({slug, schemaId});
  }

  render () {
    return (
      <Schema
        {...this.props}
        {...this.state}
        isNew={this.isNew()}
        onChange={::this.onChange}
        onCreate={::this.onCreate}
        onSave={::this.onSave}
        validateSlug={::this.validateSlug}
      />
    );
  }
}
