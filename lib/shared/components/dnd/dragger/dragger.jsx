import Component from 'components/component';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './dragger.less';

export default class Dragger extends Component {
  static propTypes = {
    dndActions: PropTypes.object.isRequired,
    onStopDrag: PropTypes.func.isRequired,
    offset: PropTypes.object,
    draggingData: PropTypes.object,
    dragInfo: PropTypes.object,
    dropInfo: PropTypes.object
  };

  getInitState () {
    const {draggingData} = this.props;
    return {
      top: draggingData.elementOffset.top + (this.props.offset && this.props.offset.top ? this.props.offset.top : 0),
      left: draggingData.elementOffset.left + (this.props.offset && this.props.offset.left ? this.props.offset.left : 0)
    };
  }

  componentDidMount () {
    const {draggingData} = this.props;

    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);

    const node = findDOMNode(this);

    const relativeX = draggingData.mouseX - draggingData.elementOffset.left;
    const relativeY = draggingData.mouseY - draggingData.elementOffset.top;
    node.style.transformOrigin = relativeX + 'px ' + relativeY + 'px';

    Velocity(node, {
      scaleX: '0.5',
      scaleY: '0.5',
      opacity: '0.7'
    }, { duration: 500, easing: 'easeOutExpo' });

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseUp (event) {
    const {dragInfo, dropInfo, onStopDrag, dndActions} = this.props;

    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);

    onStopDrag && onStopDrag(dragInfo, dropInfo);
    dndActions.stopDragging();
  }

  onMouseMove (event) {
    const {draggingData} = this.props;
    event.preventDefault();

    const deltaX = event.pageX - draggingData.mouseX + draggingData.elementOffset.left;
    const deltaY = event.pageY - draggingData.mouseY + draggingData.elementOffset.top;

    this.setState({
      top: deltaY + (this.props.offset && this.props.offset.top ? this.props.offset.top : 0),
      left: deltaX + (this.props.offset && this.props.offset.left ? this.props.offset.left : 0)
    });
  }

  render () {
    const {draggingData} = this.props;
    const style = {
      width: draggingData.elementWidth + 'px',
      top: this.state.top + 'px',
      left: this.state.left + 'px'
    };

    return (
      <div className={styles.root} draggable='false' style={style}>
        {draggingData.children}
      </div>
    );
  }
}
