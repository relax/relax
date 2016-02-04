import React from 'react';
import {Component} from 'relax-framework';

export default class Section extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  toggle (event) {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  }

  render () {
    return (
      <div className='options-section' onClick={this.toggle.bind(this)}>
        <i className='material-icons'>{this.props.value ? 'keyboard_arrow_down' : 'chevron_right'}</i>
        <span>{this.props.label}</span>
      </div>
    );
  }
}
