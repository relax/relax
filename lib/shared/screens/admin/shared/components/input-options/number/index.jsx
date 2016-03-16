import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class NumberInput extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    allowed: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    inactive: PropTypes.bool,
    className: PropTypes.string,
    arrows: PropTypes.bool,
    white: PropTypes.bool,
    small: PropTypes.bool
  };

  static defaultProps = {
    min: 0,
    max: false,
    allowed: [],
    inactive: false,
    arrows: true
  };

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
      const valueLength = (value.toString()).length;

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
    const {className, white, small} = this.props;
    const {focused} = this.state;
    const value = this.props.inactive ? '--' : this.props.value;

    return (
      <div className={cx(
          styles.root,
          focused && styles.focused,
          white && styles.white,
          small && styles.small,
          className
        )}
      >
        <input
          className={styles.input}
          type='text'
          value={focused ? this.state.value : value}
          onChange={::this.onInput}
          ref='input'
          onBlur={::this.onBlur}
          onFocus={::this.onFocus}
        />
        {this.renderArrows()}
      </div>
    );
  }

  renderArrows () {
    const {arrows} = this.props;
    if (arrows) {
      return (
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={::this.up}>
            <i className='nc-icon-mini arrows-1_minimal-up'></i>
          </button>
          <button className={styles.arrow} onClick={::this.down}>
            <i className='nc-icon-mini arrows-1_minimal-down'></i>
          </button>
        </div>
      );
    }
  }
}
