import {Component} from 'relax-framework';
import Color from './color';
import Edit from './edit';
import React from 'react';

import colorsStore from '../../../../client/stores/colors';

export default class Colors extends Component {
  getInitialState () {
    return {
      edit: false,
      colors: this.context.colors
    };
  }

  getInitialCollections () {
    return {
      colors: colorsStore.getCollection()
    };
  }

  onAddNew (event) {
    event.preventDefault();
    this.setState({
      edit: true,
      editingColor: false
    });
  }

  onEdit (color) {
    this.setState({
      edit: true,
      editingColor: color
    });
  }

  closeEdit () {
    this.setState({
      edit: false,
      editingColor: false
    });
  }

  renderColor (color) {
    return (
      <Color color={color} key={color._id} onEdit={this.onEdit.bind(this)} />
    );
  }

  renderColors () {
    if (this.state.colors && this.state.colors.length > 0) {
      return (
        <div className='color-manager-list'>
          {this.state.colors.map(this.renderColor, this)}
        </div>
      );
    }
    else {
      return (
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
  }

  renderEdit () {
    if (this.state.edit) {
      return (
        <Edit value={this.state.editingColor} onClose={this.closeEdit.bind(this)} />
      );
    }
  }

  render () {
    return (
      <div className='color-manager'>
        <div className='filter-menu'>
          <span className='admin-title'>Colors</span>
          <a href='#' className='button-clean' onClick={this.onAddNew.bind(this)}>
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
}

Colors.contextTypes = {
  colors: React.PropTypes.array.isRequired
};
