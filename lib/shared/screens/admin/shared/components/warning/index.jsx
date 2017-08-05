import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

const ICONS = {
  info: 'ui-2_alert-i',
  warning: 'ui-2_alert-',
  alert: 'ui-2_alert-'
};

export default class Warning extends Component {
  static propTypes = {
    severity: PropTypes.oneOf(['info', 'warning', 'alert']),
    children: PropTypes.any
  };

  static defaultProps = {
    severity: 'alert'
  };

  render () {
    const {severity} = this.props;

    return (
      <div className={cx(styles.root, styles[severity])}>
        <div className={styles.icon}>
          <i className={cx('nc-icon-outline', ICONS[severity])} />
        </div>
        <div className={styles.message}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
