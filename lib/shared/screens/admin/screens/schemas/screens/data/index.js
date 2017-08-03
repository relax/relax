import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
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
    id: PropTypes.string.isRequired,
    relate: PropTypes.object.isRequired,
    schema: PropTypes.object,
    loading: PropTypes.bool.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id && nextProps.id) {
      this.props.relate.refresh(nextProps);
    }
  }

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
