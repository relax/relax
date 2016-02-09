import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './statuses.less';

export default class Statuses extends Component {
  render () {
    return (
      <div className={styles.root}>
        <span className={styles.text}>Editing your draft - </span>
        <button className={styles.button}> Drop changes</button>
      </div>
    );
  }
}
