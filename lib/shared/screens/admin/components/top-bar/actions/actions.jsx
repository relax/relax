import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './actions.less';
import Back from './back';
import Displays from './displays';
import RightMenu from './right-menu';
import Statuses from './statuses';

export default class Actions extends Component {
  render () {
    return (
      <div className={styles.root}>
        <Displays />
        <Back />
        <Statuses />
        <RightMenu />
      </div>
    );
  }
}
