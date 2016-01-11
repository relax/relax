import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Highlight extends Component {
  static propTypes = {
    ElementClass: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    dom: PropTypes.node.isRequired,
    selected: PropTypes.bool.isRequired
  }

  getInitState () {
    return {
      left: 0,
      top: 0
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

  render () {
    const style = this.getPosition();
    return (
      <div className={cx('element-highlight', this.props.selected && 'selected', this.props.element.subComponent && 'sub-component', style.top < 60 && 'inside')} style={style}>
        <div className='element-identifier'>
          <i className={this.props.ElementClass.settings.icon.class}>{this.props.ElementClass.settings.icon.content}</i>
          <span>{this.props.element.label || this.props.element.tag}</span>
        </div>
      </div>
    );
  }
}
