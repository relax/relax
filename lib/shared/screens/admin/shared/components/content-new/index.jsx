import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentNew extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <button className={styles.button}>
        {this.props.children}
      </button>
    );
  }
}
