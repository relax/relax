import Component from 'components/component';
import React from 'react';

import styles from './types.less';

export default class SchemaBuilder extends Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.subHeader}>Let's create some new content types!</div>
        <div className={styles.header}>What type of content is this?</div>
        <div className={styles.options}>
          <button className={styles.option}>
            <i className='nc-icon-outline design_webpage'></i>
            <div className={styles.title}>With URL</div>
            <div className={styles.subTitle}>Single Page</div>
          </button>
          <div className={styles.or}>or</div>
          <button className={styles.option}>
            <i className='nc-icon-outline files_single-copy-04'></i>
            <div className={styles.title}>Without URL</div>
            <div className={styles.subTitle}>Multiple Table Entries</div>
          </button>
        </div>
      </div>
    );
  }
}
