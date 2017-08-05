import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

const LEFT_BUTTON = 0;

export default class Draggable extends Component {
  static propTypes = {
    dndActions: PropTypes.object.isRequired,
    type: PropTypes.string,
    dragInfo: PropTypes.object.isRequired,
    onStartDrag: PropTypes.func,
    droppableOn: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node
  };

  constructor (props, children) {
    super(props, children);
    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
  }

  onMouseUp () {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    this.onMouseUp();

    const element = findDOMNode(this);
    const elementOffset = element.getBoundingClientRect();
    const width = Math.round(elementOffset.right - elementOffset.left);
    const {startDragging} = this.props.dndActions;

    // Dragging data
    const draggingData = {
      children: this.props.children,
      elementOffset,
      elementWidth: width,
      mouseX: event.pageX,
      mouseY: event.pageY,
      type: this.props.type
    };
    if (this.props.droppableOn) {
      draggingData.droppableOn = this.props.droppableOn;
    }

    startDragging(draggingData, this.props.dragInfo);
    this.props.onStartDrag && this.props.onStartDrag();

    return false;
  }

  @bind
  onMouseDown (event) {
    if (event.button === LEFT_BUTTON) {
      const draggable = !this.props.disabled;
      event.stopPropagation();

      if (draggable) {
        event.preventDefault();
        document.addEventListener('mouseup', this.onMouseUpListener);
        document.addEventListener('mousemove', this.onMouseMoveListener);
      }
    }
  }

  render () {
    const props = {
      className: cx(this.props.children.props.className, 'draggable'),
      draggable: 'false',
      onMouseDown: this.onMouseDown
    };

    if (this.props.onClick) {
      props.onClick = this.props.onClick;
    }

    return React.cloneElement(this.props.children, props);
  }
}
