import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {hexIsValid} from 'helpers/colors';

import styles from './inputs.less';
import Input from './input';

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
    opacityChange: PropTypes.func.isRequired,
    showOpacity: PropTypes.bool.isRequired
  };

  init () {
    this.onRChange = this.onRGBChange.bind(this, 'r');
    this.onGChange = this.onRGBChange.bind(this, 'g');
    this.onBChange = this.onRGBChange.bind(this, 'b');
    this.onHChange = this.onHSVChange.bind(this, 'h');
    this.onSChange = this.onHSVChange.bind(this, 's');
    this.onVChange = this.onHSVChange.bind(this, 'v');
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
      <div className={styles.root}>
        <span className={styles.previous} onClick={this.props.previousInputType}>
          <i className='nc-icon-mini arrows-2_small-left'></i>
        </span>
        {this.renderInputs()}
        <span className={styles.next} onClick={this.props.nextInputType}>
          <i className='nc-icon-mini arrows-2_small-right'></i>
        </span>
      </div>
    );
  }

  renderInputs () {
    const {inputType, opacity, colr, showOpacity} = this.props;

    if (inputType === 'hex') {
      const hex = colr.toHex();
      return (
        <div className={styles.inputs}>
          <Input value={hex} label='HEX' onChange={::this.onHexChange} />
          {showOpacity && <Input small value={opacity} label='A' onChange={::this.onOpacityChange} />}
        </div>
      );
    } else if (inputType === 'rgba') {
      const rgb = colr.toRgbObject();
      return (
        <div className={styles.inputs}>
          <Input small value={rgb.r} label='R' onChange={this.onRChange} />
          <Input small value={rgb.g} label='G' onChange={this.onGChange} />
          <Input small value={rgb.b} label='B' onChange={this.onBChange} />
          {showOpacity && <Input small value={opacity} label='A' onChange={::this.onOpacityChange} />}
        </div>
      );
    } else if (inputType === 'hsva') {
      const hsv = colr.toHsvObject();
      return (
        <div className={styles.inputs}>
          <Input small value={hsv.h} label='H' onChange={this.onHChange} />
          <Input small value={hsv.s} label='S' onChange={this.onSChange} />
          <Input small value={hsv.v} label='V' onChange={this.onVChange} />
          {showOpacity && <Input small value={opacity} label='A' onChange={::this.onOpacityChange} />}
        </div>
      );
    }
  }
}
