import React from 'react';
import {Component} from 'relax-framework';

import Edit from './edit';
import Entry from './entry';

export default class List extends Component {
  static propTypes = {
    onEntryClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.string.isRequired,
    colors: React.PropTypes.array.isRequired,
    addOverlay: React.PropTypes.func.isRequired,
    closeOverlay: React.PropTypes.func.isRequired,
    colorsActions: React.PropTypes.object.isRequired
  }

  addNewOpen (event) {
    event.preventDefault();
    const value = this.props.selected.charAt(0) === '#' ? {label: '', value: this.props.selected} : false;
    this.props.addOverlay('new-color', (
      <Edit value={value} onClose={::this.closeEdit} colorsActions={this.props.colorsActions} />
    ));
  }

  editOpen (color) {
    this.props.addOverlay('new-color', (
      <Edit value={Object.assign({}, color)} onClose={::this.closeEdit} colorsActions={this.props.colorsActions} />
    ));
  }

  closeEdit () {
    this.props.closeOverlay('new-color');
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
      </div>
    );
  }

  renderList () {
    let result;
    if (this.props.colors.length > 0) {
      result = (
        <div>
          {this.props.colors.map(this.renderColorEntry, this)}
        </div>
      );
    } else {
      result = (
        <div className='color-warning'>
          <div><i className='material-icons'>invert_colors_off</i></div>
          <div>You still don't have any colors in your palette!</div>
        </div>
      );
    }
    return result;
  }

  renderColorEntry (color) {
    return (
      <Entry
        color={color}
        selected={this.props.selected === color._id}
        key={color._id}
        onEdit={::this.editOpen}
        onClick={this.props.onEntryClick}
        colorsActions={this.props.colorsActions}
      />
    );
  }
}
