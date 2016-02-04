import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import ContextMenu from './context-menu';

export default class Highlight extends Component {
  static propTypes = {
    ElementClass: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    dom: PropTypes.node.isRequired,
    selected: PropTypes.bool.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  getInitState () {
    return {
      context: false
    };
  }

  componentDidMount () {
    this.mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
    this.scrollBind = ::this.onScroll;
    this.resizeBind = ::this.onResize;
    document.body.addEventListener(this.mousewheelevt, this.scrollBind, false);
    window.addEventListener('resize', this.resizeBind, false);
  }

  componentWillUnmount () {
    document.body.removeEventListener(this.mousewheelevt, this.scrollBind);
    window.removeEventListener('resize', this.resizeBind);
  }

  onScroll () {
    this.updatePosition();
    this.updateTimeout = setTimeout(::this.updatePosition, 0);
  }

  onResize () {
    this.updatePosition();
    this.updateTimeout = setTimeout(::this.updatePosition, 10);
  }

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

  openContext () {
    this.setState({
      context: true
    });
  }

  closeContext () {
    this.setState({
      context: false
    });
  }

  duplicate (event) {
    event.preventDefault();
    const {duplicateElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    duplicateElement(selectedId);
  }

  remove (event) {
    event.preventDefault();
    const {removeElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    removeElement(selectedId);
  }

  render () {
    const style = this.getPosition();
    return (
      <div className={cx('element-highlight', this.props.selected && 'selected', this.props.element.subComponent && 'sub-component', style.top < 60 && 'inside', this.props.element.tag === 'Symbol' && 'symbol')} style={style}>
        <div className='element-identifier'>
          <i className={this.props.ElementClass.settings.icon.class}>{this.props.ElementClass.settings.icon.content}</i>
          <span>{this.props.element.label || this.props.element.tag}</span>
        </div>
        {this.props.selected && style.height > 30 && this.renderContext()}
      </div>
    );
  }

  renderContext () {
    let result;
    if (this.state.context) {
      const {element, pageBuilder, pageBuilderActions} = this.props;
      result = (
        <ContextMenu element={element} pageBuilder={pageBuilder} pageBuilderActions={pageBuilderActions} onClose={::this.closeContext} />
      );
    } else {
      result = (
        <div className='element-context-button' onClick={::this.openContext}>...</div>
      );
    }
    return result;
  }
}
