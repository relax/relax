import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class AlertBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    level: PropTypes.string
  }

  render () {
    return (
      <div className={cx('alert-box', this.props.level)}>
        {this.props.children}
      </div>
    );
  }
}
