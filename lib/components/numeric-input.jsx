import React from 'react';
import {Component} from 'relax-framework';

export default class Numeric extends Component {
  limitValue (value) {
    if (value < this.props.min) {
      value = this.props.min;
    }
    if (value > this.props.max) {
      value = this.props.max;
    }

    return value;
  }

  onInputChanged (event) {
    if (!isNaN(event.target.value)) {
      this.props.onChange(this.limitValue(parseFloat(event.target.value, 10)));
    }
  }

  onBlur () {
    if (isNaN(this.props.value)) {
      this.props.onChange(this.limitValue(0));
    }
  }

  onBackgroundClick (event) {
    let element = this.refs.background;

    let elementOffset = element.getBoundingClientRect();
    let width = elementOffset.right - elementOffset.left;

    let percentage = (event.pageX - elementOffset.left) / width;
    let value = Math.round(percentage * (this.props.max - this.props.min) + this.props.min, 10);

    this.props.onChange(this.limitValue(value));
  }

  onMouseDown (event) {
    event.preventDefault();

    let element = this.refs.background;

    this.backgroundOffset = element.getBoundingClientRect();
    this.backgroundWidth = this.backgroundOffset.right - this.backgroundOffset.left;

    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);

    this.onMouseMove(event);
  }

  onMouseMove (event) {
    event.preventDefault();

    let percentage = (event.pageX - this.backgroundOffset.left) / this.backgroundWidth;
    let value = Math.round(percentage * (this.props.max - this.props.min) + this.props.min, 10);

    this.props.onChange(this.limitValue(value));
  }

  onMouseUp (event) {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  render () {
    var percentage = ((this.props.value + (-this.props.min)) / (this.props.max + (-this.props.min))) * 100;
    var circleStyle = {
      transform: 'translateX('+(-percentage)+'%)',
      left: percentage+'%'
    };
    var activeStyle = {
      width: percentage + '%'
    };

    return (
      <div className='numeric'>
        <div className='numeric-slider'>
          <span className='background' ref='background' onClick={this.onBackgroundClick.bind(this)}>
            <span className='background-active' style={activeStyle}></span>
          </span>
          <span className='circle' style={circleStyle} onMouseDown={this.onMouseDown.bind(this)}></span>
        </div>
        <div className='input-holder'>
          <input type='text' pattern="[0-9]*" value={isNaN(this.props.value) ? '' : this.props.value} onChange={this.onInputChanged.bind(this)} onBlur={this.onBlur.bind(this)} />
          <label>{this.props.label}</label>
        </div>
      </div>
    );
  }
}

Numeric.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  label: React.PropTypes.string
};

Numeric.defaultProps = {
  min: 0,
  max: 100,
  label: '%'
};
