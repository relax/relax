import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

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
      <span className={cx('checkbox', this.props.disabled && 'disabled')} onClick={::this.toggle}>
        {this.props.value && <i className='material-icons'>check</i>}
      </span>
    );
  }
}
