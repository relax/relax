import * as fontsActions from 'actions/fonts';

import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Provider from './provider';

@connect(
  (state, props) => ({
    value: state.fonts[`${props.lib}Input`],
    valid: state.fonts[`${props.lib}Valid`]
  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch)
)
export default class FontsProviderContainer extends Component {
  static propTypes = {
    lib: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    changeFontInput: PropTypes.func.isRequired
  };

  @bind
  onChange (value) {
    const {changeFontInput, lib} = this.props;
    changeFontInput(lib, value);
  }

  render () {
    const {placeholder, value, valid} = this.props;

    return (
      <Provider
        valid={valid}
        value={value}
        onChange={this.onChange}
        placeholder={placeholder}
      />
    );
  }
}
