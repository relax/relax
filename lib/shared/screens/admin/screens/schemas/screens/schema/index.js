import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Schema from './components/schema';

@dataConnect(
  (state) => ({
    params: state.router.params
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
        schemaId: props.params.id
      }
    }
  })
)
export default class SchemaContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.object.isRequired
  };

  render () {
    const {schemaListCount} = this.props;
    return (
      <Schema count={schemaListCount}>
        {this.props.children}
      </Schema>
    );
  }
}
