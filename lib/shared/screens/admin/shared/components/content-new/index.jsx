import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentNew extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render () {
    const {children, onClick} = this.props;
    return (
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    );
  }
}
