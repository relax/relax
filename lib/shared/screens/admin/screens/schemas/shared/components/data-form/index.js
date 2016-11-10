import * as schemaEntryActions from 'actions/schema-entry';

import React, {PropTypes} from 'react';

import Component from 'components/component';
import DataSchemaForm from './form';
import bind from 'decorators/bind';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    values: state.schemaEntry.properties || {},
    saving: state.schemaEntry.saving,
    saved: state.schemaEntry.saved
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch),
  (props) => ({
    fragments: {
      schema: {
        _id: 1,
        properties: 1,
        type: 1
      }
    },
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
export default class DataSchemaFormContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    changeSchemaEntryToDefaults: PropTypes.func.isRequired,
    changeSchemaEntryFields: PropTypes.func.isRequired,
    changeSchemaEntryProperty: PropTypes.func.isRequired,
    addSchemaEntry: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    schemaEntry: PropTypes.object,
    schema: PropTypes.object,
    saving: PropTypes.bool,
    saved: PropTypes.bool,
    isNew: PropTypes.bool
  };

  getInitState () {
    return {
      removeConfirm: false
    };
  }

  componentWillMount () {
    if (this.props.schema) {
      this.updateSchema(this.props);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {schema} = nextProps;
    if ((this.props.schema !== schema && schema) ||
        this.props.schemaEntry !== nextProps.schemaEntry) {
      this.updateSchema(nextProps);
    }
  }

  updateSchema (props) {
    const {changeSchemaEntryToDefaults, changeSchemaEntryFields, schema, schemaEntry} = props;

    changeSchemaEntryToDefaults(schema);

    if (schemaEntry) {
      changeSchemaEntryFields(schemaEntry.properties);
    }
  }

  @bind
  onSubmit () {
    const {schemaId, schema, schemaEntry, values, isNew} = this.props;

    if (isNew) {
      this.props.addSchemaEntry(schemaId, schema.type, {
        properties: values
      }, true);
    } else {
      this.props.updateSchemaEntryProperties(schemaId, schemaEntry._id, values);
    }
  }

  render () {
    const {
      loading,
      schema,
      values,
      schemaId,
      changeSchemaEntryProperty,
      saving,
      saved,
      isNew
    } = this.props;

    return (
      <DataSchemaForm
        {...this.state}
        schemaId={schemaId}
        properties={schema && schema.properties}
        loading={loading}
        values={values}
        onChange={changeSchemaEntryProperty}
        saving={saving}
        saved={saved}
        isNew={isNew}
        onSubmit={this.onSubmit}
      />
    );
  }
}
