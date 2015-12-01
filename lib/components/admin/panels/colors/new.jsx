import {Component} from 'relax-framework';
import ColorPicker from 'react-colorpicker';
import Input from '../../../data-types/input';
import React from 'react';

export default class NewColor extends Component {
  static propTypes = {
    selected: React.PropTypes.any
  }

  getInitState () {
    return {
      title: 'Add new color',
      button: 'Add new color',
      titleInput: '',
      colorInput: '#000000'
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected) {
      this.setState({
        title: 'Editing ' + nextProps.selected.label + ' color',
        titleInput: nextProps.selected.label,
        colorInput: nextProps.selected.value,
        button: 'Change'
      });
    } else if (this.props.selected) {
      this.setState(this.getInitState());
    }
  }

  onTitleChange (value) {
    this.setState({
      titleInput: value
    });
  }

  onColorChange (color) {
    this.setState({
      colorInput: color.toHex()
    });
  }

  addNew (event) {
    event.preventDefault();

    if (this.props.selected) {
      // ColorActions.update({
      //   _id: this.props.selected._id,
      //   value: this.state.colorInput,
      //   label: this.state.titleInput
      // });
    } else {
      // ColorActions
      //   .add({
      //     label: this.state.titleInput,
      //     value: this.state.colorInput
      //   })
      //   .then(() => {
      //     this.setState(this.getInitState);
      //   });
    }
  }

  remove (event) {
    event.preventDefault();
    // ColorActions.remove(this.props.selected._id);
  }

  render () {
    return (
      <div >
        <Input type='text' value={this.state.titleInput} onChange={this.onTitleChange.bind(this)} label='Color label' />
        <div className='color-picker-wrapper'>
          <ColorPicker color={this.state.colorInput} onChange={this.onColorChange.bind(this)} />
        </div>
        <a href='#' key='addnew' className='button button-primary' onClick={this.addNew.bind(this)}>{this.state.button}</a>
        {this.renderRemoveButton()}
      </div>
    );
  }

  renderRemoveButton () {
    if (this.props.selected) {
      return (
        <a href='#' key='remove' className='button button-alert' onClick={this.remove.bind(this)}>Remove</a>
      );
    }
  }
}
