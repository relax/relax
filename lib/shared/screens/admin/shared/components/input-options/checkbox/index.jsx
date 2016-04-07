import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';

import styles from './index.less';

export default class Checkbox extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
    white: React.PropTypes.bool
  };

  @bind
  toggle (event) {
    event.preventDefault();
    const {disabled, onChange, value} = this.props;

    if (!disabled && onChange) {
      onChange(!value);
    }
  }

  render () {
    const {disabled, value, white} = this.props;
    return (
      <span
        className={cx(
          styles.checkbox,
          white && styles.white,
          disabled && styles.disabled
        )}
        onClick={this.toggle}
      >
        {value && <i className='nc-icon-mini ui-1_check'></i>}
      </span>
    );
  }
}
