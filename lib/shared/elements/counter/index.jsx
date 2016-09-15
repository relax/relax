import cx from 'classnames';
import ReactCounter from 'react-counter';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import Element from '../element';

export default class Counter extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    style: PropTypes.any.isRequired,
    styleClassMap: PropTypes.object,
    begin: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    begin: 0,
    end: 100,
    duration: 2000
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = 'text';

  getInitState () {
    return {
      animate: false
    };
  }

  onEnterScreen () {
    this.setState({
      animate: true
    });
  }

  render () {
    const classMap = this.props.styleClassMap || {};

    const props = {
      ...this.props.relax,
      htmlTag: 'div',
      settings,
      onEnterScreen: this.onEnterScreen.bind(this),
      className: cx(classMap.holder, classMap.text)
    };

    return (
      <Element {...props}>
        {this.renderCounter()}
      </Element>
    );
  }

  renderCounter () {
    let result;
    if (this.state.animate) {
      result = (
        <ReactCounter begin={this.props.begin} end={this.props.end} time={this.props.duration} easing='outCube' />
      );
    } else {
      result = <span>{this.props.begin}</span>;
    }
    return result;
  }
}
