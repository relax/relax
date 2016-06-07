import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import DataSchema from './components';

@dataConnect(
  (state) => ({
    id: state.router.params.id
  }),
  (props) => ({
    fragments: {
      schema: DataSchema.fragments.schema
    },
    variablesTypes: {
      schema: {
        id: 'ID!'
      }
    },
    initialVariables: {
      schema: {
        id: props.id
      }
    }
  })
)
export default class DataSchemaContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    const {schema, loading} = this.props;
    return (
      <DataSchema
        schema={schema}
        loading={loading}
      />
    );
  }
}
