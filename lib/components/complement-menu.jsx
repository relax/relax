import {Component} from 'relax-framework';
import React from 'react';
import cx from 'classnames';

export default class ComplementMenu extends Component {
  render () {
    return (
      <div className={cx('complement-menu', this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

ComplementMenu.propTypes = {
  className: React.PropTypes.string
};
