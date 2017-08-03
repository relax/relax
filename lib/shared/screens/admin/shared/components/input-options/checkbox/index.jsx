import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import boolean from 'boolean';

import styles from './index.less';

export default class Checkbox extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    white: PropTypes.bool
  };

  @bind
  toggle (event) {
    event.preventDefault();
    const {disabled, onChange, value} = this.props;

    if (!disabled && onChange) {
      onChange(!boolean(value));
    }
  }

  render () {
    const {disabled, value, white} = this.props;
    const checkboxValue = boolean(value);

    return (
      <span
        className={cx(
          styles.checkbox,
          white && styles.white,
          disabled && styles.disabled
        )}
        onClick={this.toggle}
      >
        {checkboxValue && <i className='nc-icon-mini ui-1_check'></i>}
      </span>
    );
  }
}
