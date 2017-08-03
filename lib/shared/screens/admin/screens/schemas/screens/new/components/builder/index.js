import * as schemaActions from 'actions/schema';
import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Builder from './builder';

@connect(
  (state) => ({
    step: state.schema.step,
    schema: state.schema.data,
    saving: state.schema.saving
  }),
  (dispatch) => bindActionCreators(schemaActions, dispatch)
)
export default class SchemasBuilder extends Component {
  static propTypes = {
    changeSchemaToDefault: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    addSchema: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.changeSchemaToDefault();
  }

  @bind
  onSubmit () {
    const {schema, addSchema} = this.props;
    addSchema(schema);
  }

  render () {
    return (
      <Builder
        {...this.props}
        {...this.state}
        onSubmit={this.onSubmit}
      />
    );
  }
}
