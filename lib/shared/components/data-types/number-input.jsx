import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

export default class NumberInput extends Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    allowed: React.PropTypes.array,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    inactive: React.PropTypes.bool,
    className: React.PropTypes.string,
    arrows: React.PropTypes.bool
  }

  static defaultProps = {
    min: 0,
    max: false,
    allowed: [],
    inactive: false,
    arrows: true
  }

  getInitState () {
    return {
      focused: false
    };
  }

  limitValue (value) {
    let result = value;

    if (this.props.min !== false) {
      if (value < this.props.min) {
        result = this.props.min;
      }
    }

    if (this.props.max !== false) {
      if (value > this.props.max) {
        result = this.props.max;
      }
    }

    return result;
  }

  getUnitAndValue (str, defaultUnit = this.props.allowed.length > 0 && this.props.allowed[0] || '') {
    let result;

    if (str === 'auto') {
      result = {
        value: 'auto',
        unit: ''
      };
    } else {
      let value = str !== '' && parseFloat(str, 10);
      value = (value === false || isNaN(value)) ? this.limitValue(0) : value;

      let unit = defaultUnit;
      const valueLength = (value + '').length;

      if (valueLength < str.length && this.props.allowed.indexOf(str.substr(valueLength)) > -1) {
        unit = str.substr(valueLength);
      }

      result = {
        value,
        unit
      };
    }

    return result;
  }

  onInput (event) {
    const string = event.target.value.replace(',', '.').toLowerCase();

    if (string === 'auto' && this.props.allowed.indexOf('auto') !== 0) {
      this.props.onChange(string);
    } else {
      const unitValue = this.getUnitAndValue(string, this.state.unitValue.unit);
      this.props.onChange(this.limitValue(unitValue.value) + unitValue.unit);
    }

    this.setState({
      value: string
    });
  }

  up (event) {
    event.preventDefault();
    if (this.props.value === 'auto') {
      this.props.onChange(this.limitValue(1) + this.props.allowed[0]);
    } else {
      const unitValue = this.getUnitAndValue(this.props.value);
      this.props.onChange(this.limitValue(unitValue.value + 1) + unitValue.unit);
    }
  }

  down (event) {
    event.preventDefault();
    if (this.props.value === 'auto') {
      this.props.onChange(this.limitValue(-1) + this.props.allowed[0]);
    } else {
      const unitValue = this.getUnitAndValue(this.props.value);
      this.props.onChange(this.limitValue(unitValue.value - 1) + unitValue.unit);
    }
  }

  onFocus () {
    this.setState({
      focused: true,
      value: this.props.inactive ? '--' : this.props.value,
      unitValue: this.getUnitAndValue(this.props.value)
    });
  }

  onBlur () {
    this.setState({
      focused: false,
      unitValue: null
    });
  }

  render () {
    const value = this.props.inactive ? '--' : this.props.value;

    return (
      <div className={cx('number-input', this.state.focused && 'focused', this.props.className)}>
        <input type='text' value={this.state.focused ? this.state.value : value} onChange={::this.onInput} ref='input' onBlur={::this.onBlur} onFocus={::this.onFocus} />
        {this.props.arrows && <div className='arrows'>
          <a href='#' onClick={::this.up}>
            <i className='fa fa-angle-up'></i>
          </a>
          <a href='#' onClick={::this.down}>
            <i className='fa fa-angle-down'></i>
          </a>
        </div>}
      </div>
    );
  }
}
