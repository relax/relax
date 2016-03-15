import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ListHeader extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    newIcon: PropTypes.string,
    onNew: PropTypes.func,
    children: PropTypes.node
  };

  render () {
    const {onBack, title} = this.props;

    return (
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <i className='nc-icon-mini arrows-1_minimal-left'></i>
          <span>Back</span>
        </button>
        <div className={styles.title}>{title}</div>
        {this.renderNewButton()}
        {this.props.children}
      </div>
    );
  }

  renderNewButton () {
    const {newIcon, onNew} = this.props;
    if (newIcon && onNew) {
      return (
        <button className={styles.newButton} onClick={onNew}>
          <i className={newIcon}></i>
        </button>
      );
    }
  }
}
