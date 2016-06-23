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

  getInitState () {
    const {schema} = this.props;
    return {
      properties: schema ? JSON.parse(schema.properties) : []
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.schema !== nextProps.schema && nextProps.schema) {
      this.setState({
        properties: JSON.parse(nextProps.schema.properties)
      });
    }
  }

  render () {
    const {properties} = this.state;
    const {loading} = this.props;

    return (
      <DataSchemaForm
        properties={properties}
        loading={loading}
      />
    );
  }
}
