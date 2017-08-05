import Animate from 'components/animate';
import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

const positionFallbacks = {
  cb: ['ct', 'lc', 'rc'], // center bottom
  ct: ['cb', 'lc', 'rc'], // center top
  lc: ['rc', 'cb', 'ct'], // left center
  rc: ['lc', 'cb', 'ct']  // right center
};

export default class Stick extends Component {
  static propTypes = {
    element: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    transition: PropTypes.string,
    verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
    verticalOffset: PropTypes.number,
    horizontalOffset: PropTypes.number,
    onClose: PropTypes.func,
    zIndex: PropTypes.number
  };

  static defaultProps = {
    transition: 'fadeIn',
    verticalPosition: 'top',
    horizontalPosition: 'center',
    verticalOffset: 0,
    horizontalOffset: 0,
    zIndex: 9999
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
    this.updateTimeout = setTimeout(this.updatePosition, 0);
  }

  onResize () {
    this.updatePosition();
    this.updateTimeout = setTimeout(this.updatePosition, 10);
  }

  @bind
  updatePosition () {
    this.setState(this.getPosition());
  }

  getPositionIt ({
    posCode,
    iniPosCode,
    relativeRect,
    targetRect,
    horizontalOffset,
    verticalOffset,
    windowHeight,
    windowWidth,
    posFallbacks
  }) {
    const hor = posCode[0];
    const vert = posCode[1];

    let position = {
      left: 0,
      top: 0
    };

    // horizontal position
    switch (hor) {
      case 'l':
        if (vert === 'c') {
          position.left = relativeRect.left - targetRect.width;
        } else {
          position.left = relativeRect.left;
        }
        break;
      case 'c':
        position.left = relativeRect.left + relativeRect.width / 2 - targetRect.width / 2;
        break;
      case 'r':
        position.left = relativeRect.left + relativeRect.width - targetRect.width;
        break;
      default:
        position.left = 0;
    }
    position.left += horizontalOffset;

    // horizontal position
    switch (vert) {
      case 't':
        position.top = relativeRect.top - targetRect.height;
        break;
      case 'c':
        position.top = relativeRect.top + relativeRect.height / 2 - targetRect.height / 2;
        break;
      case 'b':
        position.top = relativeRect.top + relativeRect.height;
        break;
      default:
        position.top = 0;
    }
    position.top += verticalOffset;

    // Offset
    const overflowsTop = position.top < 0;
    const overflowsBottom = position.top + targetRect.height > windowHeight;
    const overflowsLeft = position.left < 0;
    const overflowsRight = position.left + targetRect.width > windowWidth;

    if (overflowsTop || overflowsBottom || overflowsLeft || overflowsRight) {
      if (posFallbacks) {
        position = this.getPositionIt({
          posCode: posFallbacks.length ? posFallbacks[0] : iniPosCode,
          iniPosCode,
          relativeRect,
          targetRect,
          horizontalOffset,
          verticalOffset,
          windowHeight,
          windowWidth,
          posFallbacks: posFallbacks.length ? posFallbacks.slice(1) : null
        });
      } else {
        if (overflowsBottom) {
          position.top = relativeRect.top - targetRect.height - verticalOffset;
        }
        if (overflowsRight) {
          position.left = relativeRect.left + relativeRect.width - targetRect.width - horizontalOffset;
        }
        if (overflowsTop) {
          position.top = 0;
        }
        if (overflowsLeft) {
          position.left = 0;
        }
      }
    }

    return position;
  }

  getPosition () {
    const {element, horizontalPosition, verticalPosition, horizontalOffset, verticalOffset} = this.props;
    const rect = element.getBoundingClientRect();
    const thisRect = this.refs.holder.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const posCode = horizontalPosition[0] + verticalPosition[0];
    const posFallbacks = positionFallbacks[posCode];

    return this.getPositionIt({
      posCode,
      iniPosCode: posCode,
      relativeRect: rect,
      targetRect: thisRect,
      horizontalOffset,
      verticalOffset,
      windowHeight,
      windowWidth,
      posFallbacks
    });
  }

  render () {
    const {transition, className, zIndex} = this.props;
    const style = {
      left: this.state.left,
      top: this.state.top,
      zIndex
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
