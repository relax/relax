import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Hue from './hue';
import SatLight from './sat-light';

export default class ColorPicker extends Component {

  static propTypes = {
    colr: PropTypes.object.isRequired
  }

  render () {
    const {colr} = this.props;
    const hsv = colr.toHsvObject();

    return (
      <div className='color-picker'>
        <SatLight {...this.props} hsv={hsv} />
        <Hue {...this.props} hsv={hsv} />
      </div>
    );
  }
}
