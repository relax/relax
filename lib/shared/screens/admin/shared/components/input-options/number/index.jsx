import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class NumberInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    onDismiss: PropTypes.func,
    allowed: PropTypes.array,
    min: PropTypes.any,
    max: PropTypes.any,
    inactive: PropTypes.bool,
    className: PropTypes.string,
    arrows: PropTypes.bool,
    white: PropTypes.bool,
    small: PropTypes.bool,
    focused: PropTypes.bool
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

  componentDidMount () {
    if (this.props.focused) {
      this.refs.input.focus();
      this.refs.input.select();
    }
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
    } else if (str) {
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
    } else {
      result = {
        value: 0,
        unit: defaultUnit
      };
    }

    return result;
  }

  @bind
  onInput (event) {
    const string = event.target.value.replace(',', '.').toLowerCase();

    if (string === 'auto' && this.props.allowed.indexOf('auto') !== 0) {
      this.props.onChange(string);
    } else if (string) {
      const unitValue = this.getUnitAndValue(string, this.state.unitValue.unit);
      this.props.onChange(this.limitValue(unitValue.value) + unitValue.unit);
    }

    this.setState({
      value: string
    });
  }

  @bind
  onKeyDown (event) {
    if (event.keyCode === 13 || event.keyCode === 27) {
      const {onDismiss} = this.props;
      onDismiss && onDismiss();
    } else if (event.keyCode === 38) {
      // up arrow
      this.updateStateValue(this.up(event, event.shiftKey ? 10 : 1));
    } else if (event.keyCode === 40) {
      // down arrow
      this.updateStateValue(this.down(event, event.shiftKey ? 10 : 1));
    }
  }

  @bind
  up (event, inc) {
    let result;
    event.preventDefault();

    if (this.props.value === 'auto') {
      result = this.limitValue(inc) + this.props.allowed[0];
    } else {
      const unitValue = this.getUnitAndValue(this.props.value);
      result = this.limitValue(unitValue.value + inc) + unitValue.unit;
    }

    this.props.onChange(result);

    return result;
  }

  @bind
  down (event, inc) {
    let result;
    event.preventDefault();

    if (this.props.value === 'auto') {
      result = this.limitValue(-inc) + this.props.allowed[0];
    } else {
      const unitValue = this.getUnitAndValue(this.props.value);
      result = this.limitValue(unitValue.value - inc) + unitValue.unit;
    }

    this.props.onChange(result);

    return result;
  }

  @bind
  arrowUp (event) {
    this.up(event, 1);
  }

  @bind
  arrowDown (event) {
    this.down(event, 1);
  }

  updateStateValue (value) {
    this.setState({
      value
    });
  }

  @bind
  onFocus () {
    this.setState({
      focused: true,
      value: this.props.inactive ? '--' : this.props.value,
      unitValue: this.getUnitAndValue(this.props.value)
    });
  }

  @bind
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
          onChange={this.onInput}
          ref='input'
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
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
          <button className={styles.arrow} onClick={this.arrowUp}>
            <i className='nc-icon-mini arrows-1_minimal-up'></i>
          </button>
          <button className={styles.arrow} onClick={this.arrowDown}>
            <i className='nc-icon-mini arrows-1_minimal-down'></i>
          </button>
        </div>
      );
    }
  }
}
