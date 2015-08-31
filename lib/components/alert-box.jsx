import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';

export default class AlertBox extends Component {
  render () {
    return (
      <div className={cx('alert-box', this.props.level)}>
        {this.props.children}
      </div>
    );
  }
}
