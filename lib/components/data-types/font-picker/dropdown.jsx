import React from 'react';
import {Component} from 'relax-framework';

export default class Dropdown extends Component {

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    entries: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    tempChange: React.PropTypes.func.isRequired,
    tempRevert: React.PropTypes.func.isRequired
  }

  getInitState () {
    return {
      opened: false
    };
  }

  onEntryClick (value, event) {
    event.preventDefault();
    this.props.onChange(value);
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    });
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

  renderCollapsable () {
    if (this.state.opened) {
      return (
        <div className='collapsable'>
          {this.props.entries.map(this.renderEntry, this)}
        </div>
      );
    }
  }

  renderEntry (entry) {
    return (
      <a href='#' onClick={this.onEntryClick.bind(this, entry.value)}>
        {entry.label}
      </a>
    );
  }
}
