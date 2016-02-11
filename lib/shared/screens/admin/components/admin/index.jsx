import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Loading from '../loading';
import TopBar from '../top-bar';

export default class Admin extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node
  };

  render () {
    return (
      <div className={styles.root}>
        <TopBar />
        <div className={styles.content}>
          {this.props.loading ? <Loading /> : this.props.children}
        </div>
      </div>
    );
  }
}
