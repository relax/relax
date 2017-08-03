import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.less';

export default class Inputs extends Component {
  static propTypes = {
    small: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      focused: false
    };
  }

  @bind
  onFocus () {
    this.setState({
      focused: true,
      value: this.props.value
    });
  }

  @bind
  onBlur () {
    this.setState({
      focused: false
    });
  }

  @bind
  onChange (event) {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render () {
    const {small, value, label} = this.props;
    return (
      <div
        className={cx(styles.input, small && styles.small)}
      >
        <input
          className={styles.inputField}
          type='text'
          value={this.state.focused ? this.state.value : value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
        <div className={styles.label}>{label}</div>
      </div>
    );
  }
}
