import * as schemaEntryActions from 'actions/schema-entry';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import DataSchemaForm from './form';

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
    changeSchemaEntryProperty: PropTypes.func.isRequired,
    addSchemaEntry: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    saving: PropTypes.bool,
    saved: PropTypes.bool
  };

  componentWillMount () {
    if (this.props.schema) {
      this.updateSchema(this.props);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {schema} = nextProps;
    if (this.props.schema !== schema && schema) {
      this.updateSchema(nextProps);
    }
  }

  updateSchema (props) {
    const {changeSchemaEntryToDefaults, schema} = props;
    changeSchemaEntryToDefaults(schema);
  }

  @bind
  onSubmit () {
    const {schemaId, schema, values} = this.props;
    this.props.addSchemaEntry(schemaId, schema.type, {
      properties: values
    }, true);
  }

  render () {
    const {
      loading,
      schema,
      values,
      schemaId,
      changeSchemaEntryProperty,
      saving,
      saved
    } = this.props;

    return (
      <DataSchemaForm
        schemaId={schemaId}
        properties={schema && schema.properties}
        loading={loading}
        values={values}
        onChange={changeSchemaEntryProperty}
        saving={saving}
        saved={saved}
        onSubmit={this.onSubmit}
      />
    );
  }
}
