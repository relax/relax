import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Types extends Component {

  static propTypes = {

  }

  render () {
    return (
      <div className='types'>
        <div className='type solid active'></div>
        <div className='type linear'></div>
        <div className='type radial'></div>
      </div>
    );
  }
}
