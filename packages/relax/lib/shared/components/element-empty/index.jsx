import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ElementEmpty extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.center}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
