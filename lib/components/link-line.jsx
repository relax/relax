import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Utils from '../utils';

export default class LinkLine extends Component {
  static propTypes = {
    anchor: PropTypes.any,
    destination: PropTypes.any,
    onMouseUp: PropTypes.func,
    mouseX: PropTypes.number,
    mouseY: PropTypes.number,
    lineColor: PropTypes.string
  }

  static defaultProps = {
    destination: 'cursor',
    lineColor: '#12a5ff'
  }

  getInitState () {
    if (this.props.destination === 'cursor') {
      this.onMouseUpBind = ::this.onMouseUp;
      this.onMouseMoveBind = ::this.onMouseMove;
      document.addEventListener('mouseup', this.onMouseUpBind);
      document.addEventListener('mousemove', this.onMouseMoveBind);
    }

    return {
      mouseX: this.props.mouseX || 1,
      mouseY: this.props.mouseY || 1
    };
  }

  componentWillUnmount () {
    if (this.onMouseMoveBind) {
      document.removeEventListener('mousemove', this.onMouseMoveBind);
    }
    if (this.onMouseUpBind) {
      document.removeEventListener('mouseup', this.onMouseUpBind);
    }
  }

  onMouseUp (event) {
    event.preventDefault();
    this.props.onMouseUp && this.props.onMouseUp();
  }

  onMouseMove (event) {
    event.preventDefault();
    this.setState({
      mouseX: event.pageX,
      mouseY: event.pageY
    });
  }

  render () {
    const style = {
      zIndex: 10,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    };
    const anchorOffset = Utils.getOffsetRect(this.props.anchor);
    const anchorPosition = {
      top: anchorOffset.top + anchorOffset.height / 2,
      left: anchorOffset.left + anchorOffset.width / 2
    };
    const destinationPosition = {
      top: 0,
      left: 0
    };

    if (this.props.destination === 'cursor') {
      destinationPosition.top = this.state.mouseY;
      destinationPosition.left = this.state.mouseX;
    } else {
      const destinationOffset = Utils.getOffsetRect(this.props.destination);
      // TODO better link position based on line direction
      destinationPosition.top = destinationOffset.top;
      destinationPosition.left = destinationOffset.left;
    }

    return (
      <svg style={style}>
        <line
          x1={anchorPosition.left}
          y1={anchorPosition.top}
          x2={destinationPosition.left}
          y2={destinationPosition.top}
          strokeWidth='2'
          stroke={this.props.lineColor}
        />
        <circle
          cx={anchorPosition.left}
          cy={anchorPosition.top}
          r='2'
          fill={this.props.lineColor}
        />
        <circle
          cx={destinationPosition.left}
          cy={destinationPosition.top}
          r='2'
          fill={this.props.lineColor}
        />
      </svg>
    );
  }
}
