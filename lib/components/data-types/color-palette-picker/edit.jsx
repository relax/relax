import ColorPicker from 'react-colorpicker';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Input from '../input';
import Lightbox from '../../lightbox';

export default class Edit extends Component {
  static fragments = {
    color: {
      _id: 1,
      label: 1,
      value: 1
    }
  }

  static propTypes = {
    value: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    colorsActions: PropTypes.object.isRequired
  }

  getInitialState () {
    return {
      value: this.props.value || {
        label: '',
        value: '#ffffff'
      }
    };
  }

  onEditColorChange (color) {
    this.state.value.value = color.toHex();
    this.setState({
      value: Object.assign({}, this.state.value, {
        value: color.toHex()
      })
    });
  }

  onTitleChange (value) {
    this.setState({
      value: Object.assign({}, this.state.value, {
        label: value
      })
    });
  }

  submit () {
    if (this.state.value._id) {
      this.props.colorsActions.updateColor(this.constructor.fragments, this.state.value).then(() => this.props.onClose());
    } else {
      this.props.colorsActions.addColor(this.constructor.fragments, this.state.value).then(() => this.props.onClose());
    }
  }

  render () {
    const isNew = this.state.value._id ? false : true;
    const title = isNew ? 'Adding new color to palette' : 'Editing ' + this.state.value.label;
    const btn = isNew ? 'Add color to palette' : 'Change color';

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
