import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import Utils from '../../utils';

const LEFT_BUTTON = 0;

export default class Draggable extends Component {
  static propTypes = {
    dndActions: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    dragInfo: PropTypes.object.isRequired,
    onStartDrag: PropTypes.func,
    droppableOn: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node
  }

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
    const elementOffset = Utils.getOffsetRect(element);
    const width = elementOffset.width;
    const {startDragging} = this.props.dndActions;

    // Dragging data
    const draggingData = {
      children: this.props.children,
      elementOffset: elementOffset,
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
  }

  onMouseDown (event) {
    if (event.button === LEFT_BUTTON) {
      const draggable = !this.props.disabled;
      event.stopPropagation();

      if (draggable) {
        document.addEventListener('mouseup', this.onMouseUpListener);
        document.addEventListener('mousemove', this.onMouseMoveListener);
      }
    }
  }

  render () {
    const props = {
      className: (this.props.children.props.className || '') + ' draggable',
      draggable: 'false',
      onMouseDown: this.onMouseDown.bind(this)
    };

    if (this.props.onClick) {
      props.onClick = this.props.onClick;
    }

    return React.cloneElement(this.props.children, props);
  }
}
