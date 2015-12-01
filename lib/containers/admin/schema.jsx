import * as overlaysActions from '../../client/actions/overlays';
import * as schemaActions from '../../client/actions/schema';

import cloneDeep from 'lodash.clonedeep';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import RevisionsContainer from './revisions';
import Schema from '../../components/admin/panels/schema';

@connect(
  (state) => ({
    schema: state.schema.data,
    isSlugValid: state.schema.isSlugValid,
    errors: state.schema.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(schemaActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
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
    restoreSchema: PropTypes.func.isRequired,
    changeSchemaToDefault: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  }

  getInitState () {
    if (this.props.id === 'new') {
      this.props.changeSchemaToDefault();
    }
    return {};
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
        this.props.history.pushState({}, `/admin/schemas/${submitSchema.slug}`);
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
    // FIXME
    // const dom = findDOMNode(this.refs.success);
    //
    // if (dom) {
    //   const transition = 'transition.slideDownOut';
    //   Velocity(dom, transition, {
    //     duration: 400,
    //     display: null
    //   }).then(() => {
    //     this.setState({
    //       status: null
    //     });
    //   });
    // }
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
    this.props.changeSchemaFields(Object.assign({}, this.props.schema, values));
  }

  onPropertiesChange (properties) {
    this.props.changeSchemaFields(Object.assign({}, this.props.schema, {
      properties
    }));
  }

  isNew () {
    return !this.props.schema._id;
  }

  async validateSlug (slug, schemaId = this.props.schema._id) {
    return await this.props.validateSchemaSlug({slug, schemaId});
  }

  async onRestore (__v) {
    this.setState({
      status: 'saving',
      savingLabel: 'Restoring revision'
    });

    try {
      const schema = await this.props.restoreSchema(this.constructor.fragments, this.props.schema._id, __v);

      this.setState({
        status: 'success'
      });

      history.pushState({}, '', `/admin/schemas/${schema.restoreSchema.slug}`);
      this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
    } catch (err) {
      this.setState({
        status: 'error'
      });
    }
  }

  getCurrentSchemaProps () {
    const {schema} = this.props;

    return {
      _id: {
        _id: schema._id,
        __v: schema.__v
      },
      date: schema.updatedDate,
      user: schema.updatedBy,
      title: schema.title
    };
  }

  onRevisions (event) {
    event.preventDefault();
    this.props.addOverlay(
      'revisions',
      (
        <RevisionsContainer
          id={this.props.schema._id}
          onRestore={::this.onRestore}
          current={this.getCurrentSchemaProps()}
        />
      )
    );
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
        onRevisions={::this.onRevisions}
        validateSlug={::this.validateSlug}
        onPropertiesChange={::this.onPropertiesChange}
      />
    );
  }
}
