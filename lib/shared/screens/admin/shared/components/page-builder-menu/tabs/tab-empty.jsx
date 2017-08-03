import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './tab-empty.less';

export default class TabEmpty extends Component {
  static propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    icon: 'nc-icon-outline media-1_touch',
    children: 'Relax, you have to select an element first!'
  }

  render () {
    const {children, icon} = this.props;

    return (
      <div className={styles.info}>
        <i className={icon} />
        <div className={styles.label}>{children}</div>
      </div>
    );
  }
}
