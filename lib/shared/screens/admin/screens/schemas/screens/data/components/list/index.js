import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import List from './list';

@dataConnect(
  (state) => ({
    id: state.router.params.id
  }),
  (props) => ({
    fragments: {
      schemaList: List.fragments.schemaList
    },
    variablesTypes: {
      schemaList: {
        schemaId: 'ID!'
      }
    },
    initialVariables: {
      schemaList: {
        schemaId: props.id
      }
    }
  })
)
export default class DataSchemaListContainer extends Component {
  static fragments = List.fragments;

  static propTypes = {
    id: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired
  };

  render () {
    const {schema} = this.props;
    return (
      <List schema={schema} />
    );
  }
}
