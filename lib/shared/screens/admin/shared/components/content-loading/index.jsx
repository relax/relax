import Animate from 'components/animate';
import Component from 'components/component';
import React from 'react';
import Spinner from 'components/spinner';

import styles from './index.less';

export default class ContentLoading extends Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.center}>
          <Animate>
            <Spinner />
          </Animate>
        </div>
      </div>
    );
  }
}
