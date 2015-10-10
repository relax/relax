import {Component} from 'relax-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';

export default class AnimateProps extends Component {
  componentDidMount () {
    super.componentDidMount();
    var dom = ReactDOM.findDOMNode(this);
    Velocity(dom, this.props.props, this.props.options);
  }

  render () {
    return this.props.children;
  }
}

AnimateProps.propTypes = {
  props: React.PropTypes.object,
  options: React.PropTypes.object
};

AnimateProps.defaultProps = {
  props: {},
  options: {}
};
