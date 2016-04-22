import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    subTitle: PropTypes.string,
    title: PropTypes.string,
    small: PropTypes.bool,
    big: PropTypes.bool
  };

  componentDidMount () {
    const {onClose} = this.props;
    if (onClose) {
      this.keyDownBind = ::this.keyDown;
      document.addEventListener('keydown', this.keyDownBind);
    }
  }

  componentWillUnmount () {
    this.keyDownBind && document.removeEventListener('keydown', this.keyDownBind);
  }

  keyDown (evt) {
    const event = evt || window.event;

    // Check if escape key pressed (code: 27)
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  }

  onClose () {
    const {onClose} = this.props;
    onClose && onClose();
  }

  render () {
    const {children, small, big} = this.props;

    return (
      <Portal>
        <div className={styles.root}>
          <Animate transition='fadeIn'>
            <div className={styles.background} onClick={::this.onClose}></div>
          </Animate>
          <Animate transition='slideUpIn'>
            <div className={styles.wrapper}>
              <div className={cx(styles.content, small && styles.small, big && styles.big)}>
                {this.renderTitles()}
                {children}
              </div>
            </div>
          </Animate>
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
