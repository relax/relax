import {Component} from 'relax-framework';
import React from 'react';
import ColorPicker from 'react-colorpicker';
import Lightbox from '../lightbox';
import Input from '../data-types/input';

import colorsActions from '../../client/actions/colors';

export default class Edit extends Component {
  getInitialState () {
    return {
      value: this.props.value || {
        label: '',
        value: '#ffffff'
      }
    };
  }

  closeEdit () {
    this.props.onClose();
  }

  onEditColorChange (color) {
    this.state.value.value = color.toHex();
    this.setState({
      value: this.state.value
    });
  }

  onTitleChange (value) {
    this.state.value.label = value;
    this.setState({
      value: this.state.value
    });
  }

  submit () {
    if (this.state.value._id) {
      colorsActions.update(this.state.value).then(() => this.closeEdit());
    } else {
      colorsActions.add(this.state.value).then(() => this.closeEdit());
    }
  }

  render () {
    var isNew = this.state.value._id ? false : true;
    var title = isNew ? 'Adding new color to palette' : 'Editing '+this.state.value.label;
    var btn = isNew ? 'Add color to palette' : 'Change color';

    return (
      <Lightbox className='small' onClose={this.props.onClose} title={title}>
        <Input className='white' type='text' value={this.state.value.label} onChange={this.onTitleChange.bind(this)} placeholder='Color title' />
        <div className='color-picker-wrapper'>
          <ColorPicker color={this.state.value.value} onChange={this.onEditColorChange.bind(this)} />
        </div>
        <a href='#' className='button button-primary' onClick={this.submit.bind(this)}>{btn}</a>
      </Lightbox>
    );
  }

}
