import React from 'react';
import {Component} from 'relax-framework';

export default class Checkbox extends Component {
  toggle (event) {
    event.preventDefault();

    if(this.props.onChange){
      this.props.onChange(!this.props.value);
    }
  }

  render () {
    var className = 'checkbox'+(this.props.value ? ' active' : '');

    return (
      <a href='#' className={className} onClick={this.toggle.bind(this)}>
        <span className='background'></span>
        <span className='circle'></span>
      </a>
    );
  }
}

Checkbox.propTypes = {
  value: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired
};
