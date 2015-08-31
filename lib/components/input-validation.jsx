import {Component} from 'relax-framework';
import React from 'react';

export default class InputValidation extends Component {

  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    var validClass = 'input-valid '+(this.props.valid ? 'valid' : 'invalid');
    var icon = this.props.valid ? 'fa fa-check' : 'fa fa-remove';

    return (
      <div className='input-validate'>
        <input type='text' value={this.props.value} onChange={this.onChange.bind(this)} />
        <span className={validClass}><i className={icon}></i></span>
      </div>
    );
  }
}

InputValidation.propTypes = {
  valid: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};
