import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Animate extends Component {
  static propTypes = {
    transition: PropTypes.string,
    duration: PropTypes.number,
    children: PropTypes.node
  }

  static defaultProps = {
    transition: 'slideUpIn',
    duration: 400
  }

  componentDidMount () {
    const dom = React.findDOMNode(this);
    const transition = 'transition.' + this.props.transition;
    Velocity(dom, transition, {
      duration: this.props.duration,
      display: null
    });
  }

  render () {
    return this.props.children;
  }
}
