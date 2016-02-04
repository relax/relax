import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class ShadowPosition extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  onClick (to) {
    this.props.onChange(to);
  }

  render () {
    return (
      <div className='shadow-position'>
        <div className={cx('outset', this.props.value === 'outset' && 'active')} onClick={this.onClick.bind(this, 'outset')}></div>
        <div className={cx('inset', this.props.value === 'inset' && 'active')} onClick={this.onClick.bind(this, 'inset')}></div>
      </div>
    );
  }
}
