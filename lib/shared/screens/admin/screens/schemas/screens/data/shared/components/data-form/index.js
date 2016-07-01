import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import DataSchemaForm from './form';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id
  }),
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
    schemaId: PropTypes.string.isRequired
  };

  render () {
    const {loading, schema} = this.props;

    return (
      <DataSchemaForm
        properties={schema.properties}
        loading={loading}
      />
    );
  }
}
