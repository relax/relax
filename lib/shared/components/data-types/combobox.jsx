import cx from 'classnames';
import forEach from 'lodash.foreach';
import React from 'react';
import {Component} from 'relax-framework';

export default class Combobox extends Component {
  static propTypes = {
    labels: React.PropTypes.array,
    values: React.PropTypes.array.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  }

  getInitState () {
    return {
      opened: false
    };
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  optionClicked ( value, event ) {
    event.preventDefault();

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({
      opened: false
    });
  }

  render () {
    let label = '';
    forEach(this.props.values, (value, key) => {
      if (this.props.value === value) {
        label = this.props.labels && this.props.labels[key] || value;
      }
    });

    return (
      <div className={cx('combobox', this.props.className)} style={this.props.style}>
        <div className={cx('combobox-holder', this.state.opened && 'opened')}>
          <div className='combobox-header' onClick={this.toggle.bind(this)}>
            <div className='selected-text'>{label}</div>
            <div className='combobox-button'>
              <i className={this.state.opened ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
            </div>
          </div>
          <div className='combobox-options-holder'>
            {(this.props.labels || this.props.values).map(this.renderOption, this)}
          </div>
        </div>
      </div>
    );
  }

  renderOption (option, i) {
    return (
      <div
        key={i}
        className='combobox-option'
        onClick={this.optionClicked.bind(this, this.props.values[i])}>
        {option}
      </div>
    );
  }
}
