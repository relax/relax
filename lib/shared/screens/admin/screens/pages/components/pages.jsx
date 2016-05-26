import Component from 'components/component';
import New from 'components/new-page';
import React, {PropTypes} from 'react';

import styles from './pages.less';

export default class Pages extends Component {
  static propTypes = {
    children: PropTypes.node,
    count: PropTypes.number.isRequired
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
      <div className={styles.empty}>
        <i className='nc-icon-outline media-1_touch'></i>
        <div className={styles.emptyText}>Relax, select a page first!</div>
      </div>
    );
  }

  renderNoPages () {
    return (
      <div className={styles.noPages}>
        <div className={styles.noTitle}>Oh my!</div>
        <div className={styles.noText}>
          <span>You don’t have any pages yet!</span>
          <br />
          <span>Lets change that</span>
        </div>
        <New />
      </div>
    );
  }
}
