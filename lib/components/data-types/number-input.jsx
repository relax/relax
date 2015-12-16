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
    className: React.PropTypes.string,
    arrows: React.PropTypes.bool
  }

  static defaultProps = {
    min: 0,
    max: false,
    label: '',
    inactive: false,
    arrows: true
  }

  getInitState () {
    return {
      focused: false
    };
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
    const string = event.target.value.replace(',', '.').replace(/[^\d.-]/g, '');
    const numb = string !== '' && parseFloat(string, 10);
    numb !== false && !isNaN(numb) && this.props.onChange(this.limitValue(numb));
    this.setState({
      value: string
    });
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
      focused: true,
      value: this.props.inactive ? '--' : this.props.value
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
        <input type='text' value={this.state.focused ? this.state.value : value} onChange={::this.onInput} ref='input' onBlur={::this.onBlur} onFocus={::this.onFocus} />
        <span onMouseDown={::this.onMouseDown}>{this.props.label}</span>
        {this.props.arrows && <div className='arrows'>
          <a href='#' onClick={::this.up}>
            <i className='fa fa-angle-up'></i>
          </a>
          <a href='#' onClick={::this.down}>
            <i className='fa fa-angle-down'></i>
          </a>
        </div>}
      </div>
    );
  }
}
