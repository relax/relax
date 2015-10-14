import React from 'react';
import {Component} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Color from './color';
import Edit from './edit';

import * as colorsActions from '../../../../actions/colors';

@connect(
  (state) => ({
    colors: state.colors.data
  }),
  (dispatch) => bindActionCreators(colorsActions, dispatch)
)
export default class Colors extends Component {
  static fragments = {
    colors: Color.fragments.color
  }

  static propTypes = {
    colors: React.PropTypes.array,
    addColor: React.PropTypes.func,
    updateColor: React.PropTypes.func,
    removeColor: React.PropTypes.func
  }

  getInitialState () {
    return {
      edit: false,
      colors: this.context.colors
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

  renderColors () {
    let result;
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
      <Color color={color} key={color._id} onEdit={this.onEdit.bind(this)} removeColor={this.props.removeColor} addColor={this.props.addColor} />
    );
  }

  renderEdit () {
    if (this.state.edit) {
      return (
        <Edit value={this.state.editingColor} onClose={this.closeEdit.bind(this)} addColor={this.props.addColor} updateColor={this.props.updateColor} fragment={Color.fragments} />
      );
    }
  }
}
