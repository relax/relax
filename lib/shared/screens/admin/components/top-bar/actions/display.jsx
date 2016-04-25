import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './display.less';

export default class DisplayButton extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  };

  @bind
  onClick () {
    const {onChange, display} = this.props;
    onChange(display);
  }

  render () {
    const {icon, active} = this.props;
    return (
      <button
        className={cx(styles.button, !active && styles.unfocus)}
        onClick={this.onClick}
      >
        <i className={icon}></i>
      </button>
    );
  }
}
