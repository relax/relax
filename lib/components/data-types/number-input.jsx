import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

export default class NumberInput extends Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.node,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    inactive: React.PropTypes.bool,
    className: React.PropTypes.string
  }

  static defaultProps = {
    min: 0,
    max: false,
    label: '',
    inactive: false
  }

  limitValue (value) {
    let result = value;

    if (this.props.min !== false) {
      if (value < this.props.min) {
        result = this.props.min;
      }
    }

    if (this.props.max !== false) {
      if (value > this.props.max) {
        result = this.props.max;
      }
    }

    return result;
  }

  onInput (event) {
    const numb = event.target.value && parseFloat(event.target.value, 10);
    this.props.onChange(numb && !isNaN(numb) && this.limitValue(numb) || '');
  }

  up (event) {
    event.preventDefault();
    this.props.onChange(this.limitValue(this.props.value + 1));
  }

  down (event) {
    event.preventDefault();
    this.props.onChange(this.limitValue(this.props.value - 1));
  }

  onFocus () {
    this.setState({
      focused: true
    });
  }

  onBlur () {
    this.setState({
      focused: false
    });
  }

  onMouseDown (event) {
    event.preventDefault();

    this.startValue = this.props.value;
    this.startY = event.pageY;

    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    const cof = 2;
    var amount = this.startY - event.pageY;

    this.props.onChange(this.limitValue(Math.round(this.startValue + amount / cof)));
  }

  onMouseUp (event) {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  render () {
    const value = this.props.inactive ? '--' : this.props.value;

    return (
      <div className={cx('number-input', this.state.focused && 'focused', this.props.className)}>
        <input type='text' value={value} onChange={this.onInput.bind(this)} ref='input' onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} />
        <span onMouseDown={this.onMouseDown.bind(this)}>{this.props.label}</span>
        <div className='arrows'>
          <a href='#' onClick={this.up.bind(this)}>
            <i className='fa fa-angle-up'></i>
          </a>
          <a href='#' onClick={this.down.bind(this)}>
            <i className='fa fa-angle-down'></i>
          </a>
        </div>
      </div>
    );
  }
}
