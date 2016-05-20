import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Schema from './components/schema';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id
  }),
  (props) => ({
    fragments: {
      schemaListCount: true
    },
    variablesTypes: {
      schemaListCount: {
        schemaId: 'ID!'
      }
    },
    initialVariables: {
      schemaListCount: {
        schemaId: props.schemaId
      }
    },
    mutations: {
      addSchemaEntry: [
        {
          type: 'INCREMENT',
          field: 'schemaListCount'
        }
      ]
    }
  })
)
export default class SchemaContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    schemaId: PropTypes.string.isRequired
  };

  render () {
    const {schemaListCount, schemaId} = this.props;
    return (
      <Schema count={schemaListCount} schemaId={schemaId}>
        {this.props.children}
      </Schema>
    );
  }
}
