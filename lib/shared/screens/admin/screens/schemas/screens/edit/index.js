import * as schemaActions from 'actions/schema';
import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import SchemaEdit from './components';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    editingSchema: state.schema.data,
    removing: state.schema.removing,
    saving: state.schema.saving
  }),
  (dispatch) => bindActionCreators(schemaActions, dispatch),
  (props) => ({
    fragments: SchemaEdit.fragments,
    variablesTypes: {
      schema: {
        id: 'ID!'
      }
    },
    initialVariables: {
      schema: {
        id: props.schemaId
      }
    }
  })
)
export default class SchemaEditContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    editingSchema: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    removing: PropTypes.bool.isRequired,
    changeSchemaProperty: PropTypes.func.isRequired,
    changeSchemaPermission: PropTypes.func.isRequired
  };

  getInitState () {
    const {schema} = this.props;
    if (schema) {
      this.props.editSchema(schema);
    }

    return {
      removeConfirm: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.schema !== nextProps.schema && nextProps.schema) {
      this.props.editSchema(nextProps.schema);
    }
  }

  @bind
  toggleRemoveConfirm () {
    this.setState({
      removeConfirm: !this.state.removeConfirm
    });
  }

  @bind
  confirmRemove () {
    const {removeSchema, schemaId} = this.props;
    removeSchema(schemaId);
  }

  @bind
  updateSchema () {
    const {updateSchema, editingSchema} = this.props;
    updateSchema(editingSchema);
  }

  render () {
    const {
      loading,
      schema,
      removing,
      saving,
      editingSchema,
      changeSchemaProperty,
      changeSchemaPermission
    } = this.props;

    return (
      <SchemaEdit
        {...this.state}
        loading={loading}
        schema={schema}
        removing={removing}
        saving={saving}
        editingSchema={editingSchema}
        changeSchemaProperty={changeSchemaProperty}
        changeSchemaPermission={changeSchemaPermission}
        updateSchema={this.updateSchema}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
        confirmRemove={this.confirmRemove}
      />
    );
  }
}
