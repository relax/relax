import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ElementLoading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.center}>
          <Spinner />
          <span className={styles.loading}>
            {this.props.children}
          </span>
        </div>
      </div>
    );
  }
}
