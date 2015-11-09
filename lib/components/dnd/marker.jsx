import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

export default class Marker extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.animateInterval = setTimeout(this.animateIn.bind(this), 50);
  }

  componentWillUnmount () {
    clearTimeout(this.animateInterval);
  }

  animateIn () {
    const {droppableOrientation} = this.props.dnd;
    const animateObj = {};

    if (droppableOrientation === 'vertical') {
      animateObj.height = '7px';
    } else {
      animateObj.width = '7px';
    }

    Velocity(findDOMNode(this), animateObj, { duration: 400, easing: 'easeOutExpo' });
  }

  render () {
    const {droppableOrientation} = this.props.dnd;
    const style = {
      height: droppableOrientation === 'vertical' ? 0 : 'auto',
      width: droppableOrientation === 'vertical' ? '100%' : 0,
      backgroundColor: '#33CC33',
      opacity: '0.8'
    };

    if (droppableOrientation === 'horizontal') {
      style.display = 'table-cell';
    }

    return (
      <div style={style}></div>
    );
  }
}
