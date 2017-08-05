import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ConentNotFound extends Component {
  static propTypes = {
    name: PropTypes.string
  };

  render () {
    const {name} = this.props;

    return (
      <div className={styles.root}>
        <i className='nc-icon-outline ui-2_alert-square'></i>
        <div className={styles.textAlert}>
          {`Could not find the ${name} you're looking for`}
        </div>
        <div className={styles.text}>Select one from the menu on the left</div>
      </div>
    );
  }
}
