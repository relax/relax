import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';

import styles from './highlight.less';
import ContextMenu from './context-menu';

export default class Highlight extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    focused: PropTypes.bool.isRequired,
    element: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    dom: PropTypes.any.isRequired,
    contentElementId: PropTypes.string
  };

  componentDidMount () {
    this.mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
    this.scrollBind = ::this.onScroll;
    this.resizeBind = ::this.onResize;
    document.body.addEventListener(this.mousewheelevt, this.scrollBind, false);
    window.addEventListener('resize', this.resizeBind, false);
    this.updateTimeoutInterval = setInterval(::this.updatePosition, 30);
  }

  componentWillUnmount () {
    document.body.removeEventListener(this.mousewheelevt, this.scrollBind);
    window.removeEventListener('resize', this.resizeBind);
    clearInterval(this.updateTimeoutInterval);
    clearTimeout(this.updateTimeout);
  }

  onScroll () {
    this.updatePosition();
    this.updateTimeout = setTimeout(this.updatePosition, 0);
  }

  onResize () {
    this.updatePosition();
    this.updateTimeout = setTimeout(this.updatePosition, 10);
  }

  @bind
  updatePosition () {
    this.forceUpdate();
  }

  getPosition () {
    const rect = this.props.dom.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width || (rect.right - rect.left),
      height: rect.height || (rect.bottom - rect.top)
    };
  }

  render () {
    const {selected, element, contentElementId, focused} = this.props;
    const style = this.getPosition();
    return (
      <Portal>
        <div
          className={cx(
            styles.root,
            selected && styles.selected,
            focused && styles.focused,
            style.top < 60 && styles.inside,
            element.tag === 'Symbol' && styles.symbol,
            element.id === contentElementId && styles.contentArea
          )}
          style={style}
        >
          {this.renderIdentifier()}
          {selected && !focused && style.height > 30 && this.renderContext()}
        </div>
      </Portal>
    );
  }

  renderIdentifier () {
    const {focused, settings, element} = this.props;

    if (!focused) {
      return (
        <div className={styles.identifier}>
          <i className={settings.icon.class}>{settings.icon.content}</i>
          <span>{element.label || element.tag}</span>
        </div>
      );
    }
  }

  renderContext () {
    const {element, contentElementId} = this.props;
    return (
      <ContextMenu
        element={element}
        isContentArea={element.id === contentElementId}
      />
    );
  }
}
