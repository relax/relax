import cx from 'classnames';
import A from 'components/a';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './button.less';

export default class Menu extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool
  };

  static defaultProps = {
    active: false
  };

  render () {
    const {link, label, icon, active} = this.props;
    return (
      <A href={link} className={cx(styles.button, active && styles.active)}>
        <i className={icon}></i>
        <span>{label}</span>
      </A>
    );
  }
}
