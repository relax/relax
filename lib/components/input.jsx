import {Component} from 'relax-framework';
import React from 'react';
import classNames from 'classnames';

export default class Input extends Component {

  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    return (
      <div className={classNames('input', this.props.className)}>
        <input type={this.props.password ? 'password' : 'text'} value={this.props.value} onChange={this.onChange.bind(this)} ref='input' placeholder={this.props.placeholder || ''} />
      </div>
    );
  }
}

Input.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  password: React.PropTypes.bool
};
