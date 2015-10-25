import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Loading extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    return (
      <div className={cx('loading', this.props.className)} />
    );
  }
}
