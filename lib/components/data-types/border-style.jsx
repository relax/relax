import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

export default class BorderStyle extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  onClick (type, event) {
    event.preventDefault();
    this.props.onChange(type);
  }

  render () {
    return (
      <div className='border-style'>
        {this.renderOption('solid')}
        {this.renderOption('dashed')}
        {this.renderOption('dotted')}
        {this.renderOption('double')}
      </div>
    );
  }

  renderOption (type) {
    return (
      <div className={cx(type, this.props.value === type && 'active')} onClick={this.onClick.bind(this, type)} />
    );
  }
}
