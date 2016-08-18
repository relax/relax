import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';

import styles from './highlight.less';
import ContextMenu from './context-menu';

export default class Highlight extends Component {
  static propTypes = {
    overed: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    focused: PropTypes.bool.isRequired,
    element: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    dom: PropTypes.any.isRequired,
    context: PropTypes.string.isRequired,
    linkingDataMode: PropTypes.bool,
    elementLinks: PropTypes.array
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
    const {selected, overed, element, linkingDataMode, focused, elementLinks} = this.props;
    const style = this.getPosition();

    return (
      <Portal>
        <div
          className={cx(
            styles.root,
            style.top < 60 && styles.inside,
            overed && styles.overed,                              // element is overed
            selected && styles.selected,                          // element is selected
            focused && styles.focused,                            // element is focused
            element.tag === 'Symbol' && styles.symbol,            // element is symbol
            linkingDataMode && styles.linking,                    // element is in linking data mode
            elementLinks && elementLinks.length && styles.linked  // element is linked to some property
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
    const {overed, selected, focused, settings, element} = this.props;

    if ((overed || selected) && !focused) {
      return (
        <div className={styles.identifier}>
          <i className={settings.icon.class}>{settings.icon.content}</i>
          <span>{element.label || element.tag}</span>
        </div>
      );
    }
  }

  renderContext () {
    const {element, context, linkingDataMode} = this.props;
    return (
      <ContextMenu
        element={element}
        context={context}
        linkingDataMode={linkingDataMode}
      />
    );
  }
}
