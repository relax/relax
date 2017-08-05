import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {changeSchemaTemplate} from 'actions/schema';
import {connect} from 'react-redux';

import SchemaTemplatePicker from './schema-template-picker';

@connect(
  (state) => ({
    template: state.schema.data.template
  }),
  (dispatch) => bindActionCreators({changeSchemaTemplate}, dispatch)
)
export default class SchemaTemplatePickerContainer extends Component {
  static propTypes = {
    template: PropTypes.string.isRequired,
    changeSchemaTemplate: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      newOpened: false
    };
  }

  @bind
  toggleNew () {
    this.setState({
      newOpened: !this.state.newOpened
    });
  }

  render () {
    const {template} = this.props;

    return (
      <SchemaTemplatePicker
        {...this.state}
        toggleNew={this.toggleNew}
        template={template}
        onChange={this.props.changeSchemaTemplate}
      />
    );
  }
}
