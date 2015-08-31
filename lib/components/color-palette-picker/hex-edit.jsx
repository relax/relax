import {Component} from 'relax-framework';
import React from 'react';
import ColorPicker from 'react-colorpicker';
import Lightbox from '../lightbox';

export default class HexEdit extends Component {
  getInitialState () {
    return {
      value: this.props.value
    };
  }

  onEditColorChange (color) {
    this.setState({
      value: color.toHex()
    });
  }

  onSubmit () {
    this.props.onSubmit(this.state.value);
  }

  render () {
    return (
      <Lightbox className='small' onClose={this.props.onClose} title='Pick color'>
        <div className='color-picker-wrapper'>
          <ColorPicker color={this.state.value} onChange={this.onEditColorChange.bind(this)} />
        </div>
        <a href='#' className='button button-primary' onClick={this.onSubmit.bind(this)}>Change it</a>
      </Lightbox>
    );
  }

}

HexEdit.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};
