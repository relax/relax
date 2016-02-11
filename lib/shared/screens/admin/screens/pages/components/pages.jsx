import Menu from 'components/menu';
import React, {PropTypes} from 'react';
import Component from 'components/component';

import styles from './pages.less';

export default class Pages extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <div>
        <Menu active='Pages' />
        <div className={styles.holder}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    let result;

    if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }

    return result;
  }

  renderEmpty () {
    return (
      <div className={styles.empty}>
        <i className='nc-icon-outline design_window-paragraph'></i>
        <div className={styles.emptyText}>Relax, select a page first!</div>
      </div>
    )
  }
}
