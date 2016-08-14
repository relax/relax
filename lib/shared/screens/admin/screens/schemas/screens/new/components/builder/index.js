import * as schemaActions from 'actions/schema';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Builder from './builder';

@connect(
  (state) => ({
    step: state.schema.step,
    schema: state.schema.data
  }),
  (dispatch) => bindActionCreators(schemaActions, dispatch)
)
export default class SchemasBuilder extends Component {
  static propTypes = {
    changeSchemaToDefault: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    addSchema: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      newTemplate: false
    };
  }

  componentWillMount () {
    this.props.changeSchemaToDefault();
  }

  @bind
  onSubmit () {
    const {schema, addSchema} = this.props;
    addSchema(schema);
  }

  @bind
  toggleNewTemplate () {
    this.setState({
      newTemplate: !this.state.newTemplate
    });
  }

  render () {
    return (
      <Builder
        {...this.props}
        {...this.state}
        onSubmit={this.onSubmit}
        toggleNewTemplate={this.toggleNewTemplate}
      />
    );
  }
}
