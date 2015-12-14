import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import ColorPicker from './color-picker';
import ColorsCollection from './colors-collection';
import Inputs from './inputs';
import Opacity from './opacity';
import Types from './types';

export default class Edit extends Component {

  static propTypes = {
    colr: PropTypes.object.isRequired,
    opacity: PropTypes.number.isRequired,
    hsvChange: PropTypes.func.isRequired,
    rgbChange: PropTypes.func.isRequired,
    hexChange: PropTypes.func.isRequired,
    opacityChange: PropTypes.func.isRequired,
    inputType: PropTypes.string.isRequired,
    previousInputType: PropTypes.func.isRequired,
    nextInputType: PropTypes.func.isRequired,
    gradients: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired
  }

  render () {
    const {colr, opacity, gradients, hsvChange, rgbChange, hexChange, opacityChange, inputType, previousInputType, nextInputType} = this.props;

    return (
      <div className='color-picker-modal'>
        <span className={cx('triangle', this.props.side)} />
        {gradients && <Types />}
        <ColorPicker colr={colr} hsvChange={hsvChange} />
        <Opacity colr={colr} opacity={opacity} opacityChange={opacityChange} />
        <Inputs
          colr={colr}
          opacity={opacity}
          inputType={inputType}
          previousInputType={previousInputType}
          nextInputType={nextInputType}
          hsvChange={hsvChange}
          rgbChange={rgbChange}
          hexChange={hexChange}
          opacityChange={opacityChange}
        />
        <ColorsCollection {...this.props} />
      </div>
    );
  }
}
