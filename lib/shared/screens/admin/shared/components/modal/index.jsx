import Component from 'components/component';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    subTitle: PropTypes.string,
    title: PropTypes.string
  };

  onClose () {
    const {onClose} = this.props;
    onClose && onClose();
  }

  render () {
    const {children} = this.props;
    return (
      <Portal>
        <div className={styles.root}>
          <div className={styles.background} onClick={::this.onClose}></div>
          <div className={styles.content}>
            {this.renderTitles()}
            {children}
          </div>
        </div>
      </Portal>
    );
  }

  renderTitles () {
    const {title, subTitle} = this.props;
    if (title || subTitle) {
      return (
        <div className={styles.titles}>
          {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
          {title && <div className={styles.title}>{title}</div>}
        </div>
      );
    }
  }
}
