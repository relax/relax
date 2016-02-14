import cx from 'classnames';
import A from 'components/a';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Menu extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onActiveClick: PropTypes.func
  };

  static defaultProps = {
    active: false
  };

  onClick (event) {
    if (this.props.active && this.props.onActiveClick) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onActiveClick();
    }
  }

  render () {
    const {link, label, icon, active} = this.props;
    return (
      <A href={link} className={cx(styles.button, active && styles.active)} onClick={::this.onClick}>
        <i className={icon}></i>
        <span>{label}</span>
      </A>
    );
  }
}
