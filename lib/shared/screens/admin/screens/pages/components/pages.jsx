import Component from 'components/component';
import ContentEmpty from 'components/content-empty';
import New from 'components/new-page';
import React, {PropTypes} from 'react';

import styles from './pages.less';

export default class Pages extends Component {
  static propTypes = {
    children: PropTypes.node,
    count: PropTypes.number.isRequired
  };

  static defaultProps = {
    count: 0
  };

  render () {
    let result;

    if (this.props.count === 0) {
      result = this.renderNoPages();
    } else if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }

    return result;
  }

  renderEmpty () {
    return (
      <ContentEmpty name='page' />
    );
  }

  renderNoPages () {
    return (
      <div className={styles.noPages}>
        <div className={styles.noTitle}>Oh my!</div>
        <div className={styles.noText}>
          <span>You don’t have any pages yet!</span>
          <br />
          <span>Let's change that</span>
        </div>
        <New />
      </div>
    );
  }
}
