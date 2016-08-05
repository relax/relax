import bind from 'decorators/bind';
import utils from 'helpers/utils';
import Component from 'components/component';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';

export default class LinkLine extends Component {
  static propTypes = {
    anchor: PropTypes.any,
    destination: PropTypes.any,
    onMouseUp: PropTypes.func,
    mouseX: PropTypes.number,
    mouseY: PropTypes.number,
    lineColor: PropTypes.string
  };

  static defaultProps = {
    destination: 'cursor',
    lineColor: '#D64BFF'
  };

  getInitState () {
    const {destination, mouseX = 1, mouseY = 1} = this.props;

    if (destination === 'cursor') {
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    }

    return {
      mouseX,
      mouseY
    };
  }

  componentWillUnmount () {
    if (this.onMouseMove) {
      document.removeEventListener('mousemove', this.onMouseMove);
    }
    if (this.onMouseUp) {
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  @bind
  onMouseUp (event) {
    const {onMouseUp} = this.props;
    event.preventDefault();

    onMouseUp && onMouseUp();
  }

  @bind
  onMouseMove (event) {
    event.preventDefault();
    this.setState({
      mouseX: event.pageX,
      mouseY: event.pageY
    });
  }

  render () {
    const {anchor, destination, lineColor} = this.props;
    const {mouseX, mouseY} = this.state;

    const style = {
      zIndex: 10,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    };
    const anchorOffset = utils.getOffsetRect(anchor);
    const anchorPosition = {
      top: anchorOffset.top + anchorOffset.height / 2,
      left: anchorOffset.left + anchorOffset.width / 2
    };
    const destinationPosition = {
      top: 0,
      left: 0
    };

    if (this.props.destination === 'cursor') {
      destinationPosition.top = mouseY;
      destinationPosition.left = mouseX;
    } else {
      const destinationOffset = utils.getOffsetRect(destination);
      // TODO better link position based on line direction
      destinationPosition.top = destinationOffset.top;
      destinationPosition.left = destinationOffset.left;
    }

    return (
      <Portal>
        <svg style={style}>
          <line
            x1={anchorPosition.left}
            y1={anchorPosition.top}
            x2={destinationPosition.left}
            y2={destinationPosition.top}
            strokeWidth='2'
            stroke={lineColor}
          />
          <circle
            cx={anchorPosition.left}
            cy={anchorPosition.top}
            r='2'
            fill={lineColor}
          />
          <circle
            cx={destinationPosition.left}
            cy={destinationPosition.top}
            r='2'
            fill={lineColor}
          />
        </svg>
      </Portal>
    );
  }
}
