import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Color from './color';

export default class ColorsCollection extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    selectColor: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='colors-collection'>
        <div className='lab'>Color Collection</div>
        <div className='colors'>
          {this.props.colors.map(this.renderColor, this)}
          <span className='add' key='add'>
            <i className='material-icons'>add</i>
          </span>
        </div>
      </div>
    );
  }

  renderColor (color) {
    return (
      <Color color={color} key={color._id} selectColor={this.props.selectColor} />
    );
  }
}
