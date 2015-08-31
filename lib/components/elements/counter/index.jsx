import React from 'react';
import Component from '../../component';
import Element from '../../element';
import ReactCounter from 'react-counter';
import styles from '../../../styles';
import cx from 'classnames';

import settings from './settings';
import propsSchema from './props-schema';

export default class Counter extends Component {

  getInitialState () {
    return {
      animate: false
    };
  }

  onEnterScreen () {
    this.setState({
      animate: true
    });
  }

  renderCounter () {
    if (this.state.animate) {
      return (
        <ReactCounter begin={this.props.begin} end={this.props.end} time={this.props.duration} easing='outCube' />
      );
    } else {
      return <span>{this.props.begin}</span>;
    }
  }

  render () {
    var classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};

    var props = {
      tag: 'div',
      element: this.props.element,
      settings: this.constructor.settings,
      onEnterScreen: this.onEnterScreen.bind(this),
      className: cx(classMap.text),
      style: {
        textAlign: this.props.align
      }
    };

    return (
      <Element {...props}>
        {this.renderCounter()}
      </Element>
    );
  }
}

Counter.propTypes = {
  icon: React.PropTypes.string.isRequired,
  style: React.PropTypes.any.isRequired
};

Counter.defaultProps = {
  begin: 0,
  end: 100,
  duration: 2000,
  align: 'center'
};

Counter.propsSchema = propsSchema;
Counter.settings = settings;
