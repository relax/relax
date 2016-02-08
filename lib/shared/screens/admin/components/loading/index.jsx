import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import styles from './index.less';

export default class Loading extends Component {
  render () {
    return (
      <div className={cx(styles.loading)} />
    );
  }
}
