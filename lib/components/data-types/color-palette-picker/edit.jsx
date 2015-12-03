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
    colors: PropTypes.array.isRequired,
    hsvChange: PropTypes.func.isRequired,
    rgbChange: PropTypes.func.isRequired,
    hexChange: PropTypes.func.isRequired,
    opacityChange: PropTypes.func.isRequired,
    inputType: PropTypes.string.isRequired,
    previousInputType: PropTypes.func.isRequired,
    nextInputType: PropTypes.func.isRequired,
    selectColor: PropTypes.func.isRequired
  }

  render () {
    const {colr, opacity, hsvChange, rgbChange, hexChange, opacityChange, inputType, previousInputType, nextInputType, selectColor} = this.props;

    return (
      <div className='edit-color'>
        <span className='triangle' />
        <Types />
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
      <ColorsCollection colors={this.props.colors} selectColor={selectColor} />
      </div>
    );
  }
}
