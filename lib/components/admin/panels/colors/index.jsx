import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Color from './color';
import Edit from './edit';

export default class Colors extends Component {
  static fragments = {
    colors: Color.fragments.color
  }

  static propTypes = {
    edit: PropTypes.boolean,
    editingColor: PropTypes.boolean,
    colors: PropTypes.array,
    addColor: PropTypes.func,
    updateColor: PropTypes.func,
    removeColor: PropTypes.func,
    onAddNew: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='color-manager'>
        <div className='filter-menu'>
          <span className='admin-title'>Colors</span>
          <a href='#' className='button-clean' onClick={this.props.onAddNew}>
            <i className='material-icons'>invert_colors</i>
            <span>Add color to palette</span>
          </a>
        </div>
        <div className='admin-scrollable'>
          {this.renderColors()}
        </div>
        {this.renderEdit()}
      </div>
    );
  }

  renderColors () {
    var result;

    if (this.props.colors && this.props.colors.length > 0) {
      result = (
        <div className='color-manager-list'>
          {this.props.colors.map(this.renderColor, this)}
        </div>
      );
    } else {
      result = (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No colors added yet!</p>
            <p>You don't have any color in your palette yet, you can add new colors on the add new button above</p>
          </div>
        </div>
      );
    }

    return result;
  }

  renderColor (color) {
    return (
      <Color color={color} key={color._id} onEdit={this.props.onEdit} removeColor={this.props.removeColor} addColor={this.props.addColor} />
    );
  }

  renderEdit () {
    if (this.props.edit) {
      return (
        <Edit value={this.props.editingColor} onClose={this.props.onClose} addColor={this.props.addColor} updateColor={this.props.updateColor} fragment={Color.fragments} />
      );
    }
  }
}
