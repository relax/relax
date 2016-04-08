import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './content.less';

export default class Content extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
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
        <i className='nc-icon-outline media-1_touch'></i>
        <div className={styles.emptyText}>Relax, select a menu first!</div>
      </div>
    );
  }
}
