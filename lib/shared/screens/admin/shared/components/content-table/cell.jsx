import Component from 'components/component';
import React, {PropTypes} from 'react';

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
