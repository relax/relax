import React from 'react';
import Velocity from 'velocity-animate';
import {Component} from 'relax-framework';

export default class AnimateProps extends Component {
  static propTypes = {
    props: React.PropTypes.object,
    options: React.PropTypes.object,
    children: React.PropTypes.node
  }

  static defaultProps = {
    props: {},
    options: {}
  }

  componentDidMount () {
    var dom = React.findDOMNode(this);
    Velocity(dom, this.props.props, this.props.options);
  }

  render () {
    return this.props.children;
  }
}
