import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ElementCovered extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }
}
