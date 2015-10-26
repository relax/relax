import React from 'react';
import {Component} from 'relax-framework';

export default class Optional extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired
  }

  toggle (event) {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  }

  render () {
    return (
      <div className='optional' onClick={this.toggle.bind(this)}>
        <span className='label'>{this.props.label}</span>
        <span className='box'>
          {this.props.value && <i className='material-icons'>check</i>}
        </span>
      </div>
    );
  }
}
