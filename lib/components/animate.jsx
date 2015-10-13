import {Component} from 'relax-framework';
import React from 'react';
import Velocity from 'velocity-animate';

export default class Animate extends Component {
  static propTypes = {
    transition: React.PropTypes.string,
    duration: React.PropTypes.number
  }

  static defaultProps = {
    transition: 'slideUpIn',
    duration: 400
  }

  componentDidMount () {
    var dom = React.findDOMNode(this);
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
