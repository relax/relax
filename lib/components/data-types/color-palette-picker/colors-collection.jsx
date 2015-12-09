import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Color from './color';
import Input from '../input';

export default class ColorsCollection extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    selectColor: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    addingColor: PropTypes.bool.isRequired,
    addingColorName: PropTypes.string.isRequired,
    changeAddingColor: PropTypes.func.isRequired,
    toggleAddingColor: PropTypes.func.isRequired,
    addColor: PropTypes.func.isRequired
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.addColor();
  }

  render () {
    return (
      <div className='colors-collection'>
        <div className='lab'>Color Collection</div>
        <div className='colors'>
          {this.props.colors.map(this.renderColor, this)}
          <span className='add' key='add' onClick={this.props.toggleAddingColor}>
            <i className='material-icons'>add</i>
          </span>
        </div>
        {this.renderAdding()}
      </div>
    );
  }

  renderColor (color) {
    return (
      <Color
        color={color}
        key={color._id}
        selectColor={this.props.selectColor}
        addOverlay={this.props.addOverlay}
        closeOverlay={this.props.closeOverlay}
      />
    );
  }

  renderAdding () {
    if (this.props.addingColor) {
      return (
        <form className='adding-color white-options' onSubmit={::this.onSubmit}>
          <Input placeholder='Color name' value={this.props.addingColorName} onChange={this.props.changeAddingColor} focused />
          <div className='save-btn' onClick={::this.onSubmit}>Save</div>
        </form>
      );
    }
  }
}
