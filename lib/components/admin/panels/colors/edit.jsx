import {Component} from 'relax-framework';
import ColorPicker from 'react-colorpicker';
import Input from '../../../data-types/input';
import React from 'react';
import Lightbox from '../../../lightbox';

export default class EditColor extends Component {
  static propTypes = {
    value: React.PropTypes.any,
    onClose: React.PropTypes.func.isRequired,
    addColor: React.PropTypes.func.isRequired,
    updateColor: React.PropTypes.func.isRequired,
    fragment: React.PropTypes.object.isRequired
  }

  getInitState () {
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
      this.props.updateColor(this.props.fragment, this.state.value).then(() => this.closeEdit());
    } else {
      this.props.addColor(this.props.fragment, this.state.value).then(() => this.closeEdit());
    }
  }

  render () {
    var isNew = this.props.value ? false : true;
    var title = isNew ? 'Adding new color to palette' : 'Editing ' + this.state.value.label;
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
