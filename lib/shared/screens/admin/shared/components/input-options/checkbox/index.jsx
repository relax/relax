import cx from 'classnames';
import Component from 'components/component';
import React from 'react';

import styles from './index.less';

export default class Checkbox extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool
  };

  toggle (event) {
    event.preventDefault();

    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.value);
    }
  }

  render () {
    const {disabled, value} = this.props;
    return (
      <span className={cx(styles.checkbox, disabled && styles.disabled)} onClick={::this.toggle}>
        {value && <i className='nc-icon-mini ui-1_check'></i>}
      </span>
    );
  }
}
