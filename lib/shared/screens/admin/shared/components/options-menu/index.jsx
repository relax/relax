import Component from 'components/component';
import React from 'react';

export default class OptionsMenu extends Component {
  static propTypes = {
    options: React.PropTypes.array.isRequired,
    style: React.PropTypes.object
  };

  render () {
    return (
      <div className='options-menu' style={this.props.style}>
        {this.props.options.map(this.renderOption, this)}
      </div>
    );
  }

  renderOption (option, key) {
    return (
      <button onClick={option.action || 'return false;'} key={key}>
        {option.icon && <i className={option.icon}></i>}
        {option.label}
      </button>
    );
  }
}
