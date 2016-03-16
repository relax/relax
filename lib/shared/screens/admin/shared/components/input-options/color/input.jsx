import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './input.less';

export default class Inputs extends Component {
  static propTypes = {
    small: PropTypes.bool,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      focused: false
    };
  }

  onFocus () {
    this.setState({
      focused: true,
      value: this.props.value
    });
  }

  onBlur () {
    this.setState({
      focused: false
    });
  }

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
        onFocus={::this.onFocus}
        onBlur={::this.onBlur}
        onChange={::this.onChange}
      >
        <input className={styles.inputField} type='text' value={this.state.focused ? this.state.value : value} />
        <div className={styles.label}>{label}</div>
      </div>
    );
  }
}
