import {Component} from 'relax-framework';
import React from 'react';
import Entry from './entry';
import Edit from './edit';
import cloneDeep from 'lodash.clonedeep';

import colorsStore from '../../client/stores/colors';

export default class List extends Component {
  getInitialState () {
    return {
      colors: [],
      editing: false
    };
  }

  getInitialCollections () {
    return {
      colors: colorsStore.getCollection()
    };
  }

  addNewOpen (event) {
    event.preventDefault();
    this.setState({
      editing: true,
      editingValue: this.props.selected.charAt(0) === '#' ? {label: '', value: this.props.selected} : false
    });
  }

  editOpen (color) {
    this.setState({
      editing: true,
      editingValue: cloneDeep(color)
    });
  }

  closeEdit () {
    this.setState({
      editing: false
    });
  }

  renderColorEntry (color) {
    return (
      <Entry color={color} selected={this.props.selected === color._id} key={color._id} onEdit={this.editOpen.bind(this)} onClick={this.props.onEntryClick}></Entry>
    );
  }

  renderList () {
    if (this.state.colors.length > 0) {
      return (
        <div>
          {this.state.colors.map(this.renderColorEntry, this)}
        </div>
      );
    } else {
      return (
        <div className='color-warning'>
          <div><i className='material-icons'>invert_colors_off</i></div>
          <div>You still don't have any colors in your palette!</div>
        </div>
      );
    }
  }

  renderEditing () {
    if (this.state.editing) {
      return (
        <Edit value={this.state.editingValue} onClose={this.closeEdit.bind(this)} />
      );
    }
  }

  render () {
    return (
      <div className='color-opened'>
        <div className='color-list'>
          {this.renderList()}
        </div>
        <div className='color-add-new' onClick={this.addNewOpen.bind(this)}>
          <i className='material-icons'>add_circle_outline</i>
          <span>Add new color</span>
        </div>
        {this.renderEditing()}
      </div>
    );
  }
}

List.propTypes = {
  onEntryClick: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string.isRequired
};
