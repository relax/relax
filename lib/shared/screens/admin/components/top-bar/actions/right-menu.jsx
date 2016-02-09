import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './right-menu.less';

export default class RightMenu extends Component {
  render () {
    return (
      <div className={styles.root}>
        <button className={cx(styles.button, styles.iconButton)}>
          <i className='nc-icon-mini ui-2_time-clock'></i>
        </button>
        <button className={cx(styles.button, styles.iconButton)}>
          <i className='nc-icon-mini ui-1_settings-gear-64'></i>
        </button>
        <button className={cx(styles.button, styles.textButton)}>
          Preview
        </button>
        <button className={cx(styles.button, styles.textButton, styles.primaryButton)}>
          Save
        </button>
      </div>
    );
  }
}
