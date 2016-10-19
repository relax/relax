import React, {PropTypes} from 'react';

import Component from 'components/component';
import DataSchemaForm from 'components/data-form';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    id: state.router.params.id,
    entryId: state.router.params.entryId
  }),
  (props) => ({
    fragments: {
      schemaEntry: {
        _id: 1,
        properties: 1
      }
    },
    variablesTypes: {
      schemaEntry: {
        id: 'ID!',
        schemaId: 'ID!'
      }
    },
    initialVariables: {
      schemaEntry: {
        id: props.entryId,
        schemaId: props.id
      }
    }
  })
)
export default class DataSchemaEntryEdit extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    schemaId: PropTypes.string.isRequired
  };

  render () {
    const {schemaEntry} = this.props;

    return (
      <DataSchemaForm
        schemaEntry={schemaEntry}
      />
    );
  }
}
