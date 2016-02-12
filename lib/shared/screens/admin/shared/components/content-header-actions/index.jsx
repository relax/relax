import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentHeaderActions extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }
}
