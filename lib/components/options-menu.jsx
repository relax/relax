import React from 'react';
import {Component} from 'relax-framework';

export default class OptionsMenu extends Component {
  renderOption (option, key) {
    return (
      <a href='#' onClick={option.action || 'return false;'} key={key}>
        {option.icon ? <i className={option.icon}></i> : null}
        {option.label}
      </a>
    );
  }

  render () {
    return (
      <div className='options-menu'>
        {this.props.options.map(this.renderOption, this)}
      </div>
    );
  }
}

OptionsMenu.propTypes = {
  options: React.PropTypes.array.isRequired
};
