import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ListSearchFilter extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className={styles.root}>
        <label className={styles.searchLabel}>
          <i className='nc-icon-mini ui-1_zoom'></i>
          <input type='text' className={styles.search} placeholder='Search..' />
        </label>
        <div className={styles.filter}>
          <span>Date desc</span>
          <i className='nc-icon-mini arrows-1_minimal-down'></i>
        </div>
      </div>
    );
  }
}
