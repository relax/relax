import cx from 'classnames';
import React from 'react';
import Component from 'components/component';

import styles from './index.less';

export default class Loading extends Component {
  render () {
    return (
      <div className={cx(styles.loading)} />
    );
  }
}
