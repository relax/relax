import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import utils from '../../../utils';
import Input from './input';
import {hexIsValid} from '../../../helpers/colors';

export default class Inputs extends Component {

  static propTypes = {
    colr: PropTypes.object.isRequired,
    opacity: PropTypes.number.isRequired,
    previousInputType: PropTypes.func.isRequired,
    nextInputType: PropTypes.func.isRequired,
    inputType: PropTypes.string.isRequired,
    hexChange: PropTypes.func.isRequired,
    hsvChange: PropTypes.func.isRequired,
    rgbChange: PropTypes.func.isRequired,
    opacityChange: PropTypes.func.isRequired
  }

  onHexChange (value) {
    if (hexIsValid(value)) {
      this.props.hexChange(value);
    }
  }

  onRGBChange (prop, value) {
    const number = parseInt(value, 10);

    if (!isNaN(number)) {
      const rgb = this.props.colr.toRgbObject();
      rgb[prop] = utils.limitNumber(number, 0, 255);
      this.props.rgbChange(rgb);
    }
  }

  onHSVChange (prop, value) {
    const number = parseInt(value, 10);

    if (!isNaN(number)) {
      const hsv = this.props.colr.toHsvObject();
      if (prop === 'h') {
        hsv[prop] = utils.limitNumber(number, 0, 360);
      } else {
        hsv[prop] = utils.limitNumber(number, 0, 100);
      }
      this.props.hsvChange(hsv);
    }
  }

  onOpacityChange (value) {
    const opacity = parseInt(value, 10);

    if (!isNaN(opacity)) {
      this.props.opacityChange(utils.limitNumber(opacity, 0, 100));
    }
  }

  render () {
    return (
      <div className='inputs'>
        <span className='previous' onClick={this.props.previousInputType}>
          <i className='material-icons'>keyboard_arrow_left</i>
        </span>
        {this.renderInputs()}
        <span className='next' onClick={this.props.nextInputType}>
          <i className='material-icons'>keyboard_arrow_right</i>
        </span>
      </div>
    );
  }

  renderInputs () {
    const {inputType, opacity, colr} = this.props;

    if (inputType === 'hex') {
      const hex = colr.toHex();
      return (
        <div className='current-inputs'>
          <Input value={hex} label='HEX' onChange={::this.onHexChange} />
          <Input small value={opacity} label='A' onChange={::this.onOpacityChange} />
        </div>
      );
    } else if (inputType === 'rgba') {
      const rgb = colr.toRgbObject();
      return (
        <div className='current-inputs'>
          <Input small value={rgb.r} label='R' onChange={this.onRGBChange.bind(this, 'r')} />
          <Input small value={rgb.g} label='G' onChange={this.onRGBChange.bind(this, 'g')} />
          <Input small value={rgb.b} label='B' onChange={this.onRGBChange.bind(this, 'b')} />
          <Input small value={opacity} label='A' onChange={::this.onOpacityChange} />
        </div>
      );
    } else if (inputType === 'hsva') {
      const hsv = colr.toHsvObject();
      return (
        <div className='current-inputs'>
          <Input small value={hsv.h} label='H' onChange={this.onHSVChange.bind(this, 'h')} />
          <Input small value={hsv.s} label='S' onChange={this.onHSVChange.bind(this, 's')} />
          <Input small value={hsv.v} label='V' onChange={this.onHSVChange.bind(this, 'v')} />
          <Input small value={opacity} label='A' onChange={::this.onOpacityChange} />
        </div>
      );
    }
  }
}
