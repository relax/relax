import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './content-types.less';

export default class ContentTypes extends Component {
  render () {
    return (
      <div className={styles.contentTypes}>
        <div>
          <span className={styles.contentTypesText}>Content Types</span>
          <button className={styles.contentTypesButton}>
            <i className='nc-icon-mini ui-1_circle-bold-add'></i>
          </button>
        </div>
      </div>
    );
  }
}
