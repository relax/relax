import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Stick extends Component {
  static propTypes = {
    element: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    transition: PropTypes.string,
    verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
    verticalOffset: PropTypes.number,
    horizontalOffset: PropTypes.number,
    onClose: PropTypes.func
  };

  static defaultProps = {
    transition: 'fadeIn',
    verticalPosition: 'top',
    horizontalPosition: 'center',
    verticalOffset: 0,
    horizontalOffset: 0
  };

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
    this.onCloseBind = ::this.onClose;
    document.body.addEventListener(this.mousewheelevt, this.scrollBind, false);
    window.addEventListener('resize', this.resizeBind, false);
    this.props.onClose && document.body.addEventListener('mousedown', this.onCloseBind, false);
    this.updatePosition();
  }

  componentWillUnmount () {
    document.body.removeEventListener(this.mousewheelevt, this.scrollBind);
    window.removeEventListener('resize', this.resizeBind);
    this.props.onClose && document.body.removeEventListener('mousedown', this.onCloseBind);
  }

  onClose (event) {
    const rect = this.props.element.getBoundingClientRect();
    const thisRect = this.refs.holder.getBoundingClientRect();

    const outOfElement = (event.pageX < rect.left || event.pageX > rect.left + rect.width) ||
                         (event.pageY < rect.top || event.pageY > rect.top + rect.height);
    const outOfThis = (event.pageX < thisRect.left || event.pageX > thisRect.left + thisRect.width) ||
                      (event.pageY < thisRect.top || event.pageY > thisRect.top + thisRect.height);

    if (outOfElement && outOfThis) {
      this.props.onClose();
    }
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
    this.setState(this.getPosition());
  }

  getPosition () {
    const position = {
      left: 0,
      top: 0,
      horizontal: this.props.horizontalPosition,
      vertical: this.props.verticalPosition
    };
    const rect = this.props.element.getBoundingClientRect();
    const thisRect = this.refs.holder.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    switch (this.props.horizontalPosition) {
      case 'left':
        position.left = rect.left;
        break;
      case 'center':
        position.left = rect.left + rect.width / 2 - thisRect.width / 2;
        break;
      case 'right':
        position.left = rect.left + rect.width - thisRect.width;
        break;
      default:
        position.left = 0;
    }
    position.left += this.props.horizontalOffset;

    switch (this.props.verticalPosition) {
      case 'top':
        position.top = rect.top - thisRect.height;
        break;
      case 'center':
        position.top = rect.top + rect.height / 2 - thisRect.height / 2;
        break;
      case 'bottom':
        position.top = rect.top + rect.height;
        break;
      default:
        position.top = 0;
    }
    position.top += this.props.verticalOffset;

    // Overflows
    if (position.top + thisRect.height > windowHeight) {
      position.top = rect.top - thisRect.height - this.props.verticalOffset;
      position.vertical = 'top';
    }
    if (position.left + thisRect.width > windowWidth) {
      position.left = rect.left + rect.width - thisRect.width - this.props.horizontalOffset;
      position.horizontal = 'right';
    }

    return position;
  }

  render () {
    const {transition, className} = this.props;
    // const {vertical, horizontal} = this.state;
    const style = {
      left: this.state.left,
      top: this.state.top
    };

    return (
      <Animate transition={transition} duration={300}>
        <div className={cx(styles.stick, className)} style={style} ref='holder'>
          {this.props.children}
        </div>
      </Animate>
    );
  }
}
