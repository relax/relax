import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from './animate';

export default class Overlay extends Component {
  static propTypes = {
    element: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  }

  getInitState () {
    return this.getPosition();
  }

  getPosition () {
    const rect = this.props.element.getBoundingClientRect();
    return {
      left: rect.left + (rect.right - rect.left) / 2,
      top: rect.top
    };
  }

  render () {
    return (
      <Animate transition='fadeIn'>
        <div className={cx('stick', this.props.className)} style={this.state}>
          {this.props.children}
        </div>
      </Animate>
    );
  }
}
