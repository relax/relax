import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class SettingsContent extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <Scrollable className={styles.root}>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </Scrollable>
    );
  }
}
