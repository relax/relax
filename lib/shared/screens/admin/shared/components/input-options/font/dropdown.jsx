import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    tempChange: PropTypes.func.isRequired,
    tempRevert: PropTypes.func.isRequired
  };

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
