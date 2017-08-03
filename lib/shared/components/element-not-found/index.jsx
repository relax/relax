import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ElementNotFound extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.center}>
          <i className='nc-icon-outline ui-2_alert-square-' />
          <span className={styles.label}>
            {this.props.children}
          </span>
        </div>
      </div>
    );
  }
}
