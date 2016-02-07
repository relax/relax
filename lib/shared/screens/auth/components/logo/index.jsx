import React from 'react';
import {Component} from 'relax-framework';

import styles from './index.less';

export default class Logo extends Component {
  render () {
    return (
      <div className={styles.logo}>
        <img src='/images/admin/logo_big.png' width='150' />
        <div className={styles.version}>beta</div>
      </div>
    );
  }
}
