import {Component} from 'relax-framework';
import React from 'react';

export default class Dropdown extends Component {

  getInitialState () {
    return {
      opened: false
    };
  }

  onEntryClick (value, event) {
    event.preventDefault();
    this.props.onChange(value);
  }

  onEntryEnter (value) {
    this.props.tempChange(value);
  }

  onEntryLeave () {
    this.props.tempRevert();
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  renderEntry (entry) {
    return (
      <a href='#'
        onClick={this.onEntryClick.bind(this, entry.value)}
        onMouseEnter={this.onEntryEnter.bind(this, entry.value)}
        onMouseLeave={this.onEntryLeave.bind(this)}>
        {entry.label}
      </a>
    );
  }

  renderCollapsable () {
    if (this.state.opened) {
      return (
        <div className='collapsable'>
          {this.props.entries.map(this.renderEntry, this)}
        </div>
      );
    }
  }

  render () {
    return (
      <div className='font-picker-dropdown' onClick={this.toggle.bind(this)}>
        {this.renderCollapsable()}
        <span>
          {this.props.label}
          <i className='fa fa-caret-down'></i>
        </span>
      </div>
    );
  }
}

Dropdown.propTypes = {
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  entries: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  tempChange: React.PropTypes.func.isRequired,
  tempRevert: React.PropTypes.func.isRequired
};
