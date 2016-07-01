import * as schemaEntryActions from 'actions/schema-entry';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import DataSchemaForm from './form';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    values: state.schemaEntry.properties || {}
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch),
  (props) => ({
    fragments: {
      schema: {
        _id: 1,
        properties: 1
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
    onSubmit: PropTypes.func.isRequired,
    schemaId: PropTypes.string.isRequired,
    changeSchemaEntryToDefaults: PropTypes.func.isRequired,
    changeSchemaEntryProperty: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
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

  render () {
    const {
      loading,
      schema,
      values,
      changeSchemaEntryProperty
    } = this.props;

    return (
      <DataSchemaForm
        properties={schema && schema.properties}
        loading={loading}
        values={values}
        onChange={changeSchemaEntryProperty}
      />
    );
  }
}
