import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './cell.less';

export default class Cell extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    const {children} = this.props;
    return (
      <td className={styles.root}>
        {children}
      </td>
    );
  }
}
