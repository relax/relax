import bind from 'decorators/bind';
import Component from 'components/component';
import CssPosition from 'components/css-position';
import React from 'react';
import PropTypes from 'prop-types';

export default class PositionInputOption extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onChange (key, val) {
    const {onChange, value} = this.props;
    onChange(Object.assign({}, value, {
      [key]: val
    }));
  }

  render () {
    const {value = {
      position: 'static'
    }} = this.props;

    return (
      <CssPosition
        values={value}
        onChange={this.onChange}
      />
    );
  }
}
