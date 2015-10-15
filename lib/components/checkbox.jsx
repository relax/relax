import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';

export default class Checkbox extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool
  }

  toggle (event) {
    event.preventDefault();

    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.value);
    }
  }

  render () {
    return (
      <a href='#' className={cx('checkbox', this.props.value && 'active', this.props.disabled && 'disabled')} onClick={this.toggle.bind(this)}>
        <span className='background'></span>
        <span className='circle'></span>
      </a>
    );
  }
}
