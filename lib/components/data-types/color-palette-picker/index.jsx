import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import HexEdit from './hex-edit';
import List from './list';
import NumberInput from '../number-input';
import {getColor, getColorString} from '../../../helpers/colors';

export default class ColorPicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    toggleOpened: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    className: PropTypes.string,
    colors: PropTypes.array.isRequired,
    opened: PropTypes.bool.isRequired
  }

  onOpacityChange (opacity) {
    this.props.onChange({
      opacity: parseInt(opacity, 10)
    });
  }

  onHexChange (event) {
    this.props.onChange({
      type: 'custom',
      value: event.target.value
    });
  }

  onEntryClick (id) {
    this.props.onChange({
      type: 'palette',
      value: id
    });
    this.props.toggleOpened();
  }

  toggleOpen (event) {
    event.preventDefault();
    this.props.toggleOpened();
  }

  openEditColor (hex) {
    this.props.addOverlay('color-edit', (
      <HexEdit onClose={::this.closeEditColor} onSubmit={::this.submitEditColor} value={hex} />
    ));
  }

  closeEditColor () {
    this.props.closeOverlay('color-edit');
  }

  submitEditColor (hex) {
    this.props.onChange({
      type: 'custom',
      value: hex
    });
    this.props.closeOverlay('color-edit');
  }

  render () {
    const color = getColor(this.props.value, this.props.colors);
    const colorString = getColorString(color, this.props.colors);
    const hsl = color.colr.toHslObject();
    const colorStyle = {
      backgroundColor: colorString,
      borderColor: 'transparent'
    };

    return (
      <div className={cx('color-picker', hsl.l > 60 && color.opacity > 50 && 'dark', this.props.className)}>
        <div className='color-preview' style={colorStyle} onClick={this.toggleOpen.bind(this)}>
          <span>{color.label}</span>
          <div className='expand'><i className='material-icons'>{this.props.value.type === 'palette' ? 'invert_colors' : 'invert_colors_off'}</i></div>
        </div>
        {this.renderContent(color)}
      </div>
    );
  }

  renderContent (color) {
    let result;
    if (this.props.opened) {
      result = (
        <List onEntryClick={this.onEntryClick.bind(this)} selected={this.props.value.value} {...this.props} />
      );
    } else {
      const hex = color.colr.toHex();
      const hexString = this.props.value.type === 'palette' ? hex : this.props.value.value;

      result = (
        <div className='color-info'>
          <div className='color-value-holder'>
            <div className='color-value-preview' style={{backgroundColor: hex}} onClick={this.openEditColor.bind(this, hex)}></div>
            <input className='color-value' value={hexString} onChange={this.onHexChange.bind(this)}></input>
          </div>
          <div className='color-opacity-holder'>
            <NumberInput onChange={this.onOpacityChange.bind(this)} value={this.props.value.opacity} label='%' min={0} max={100} />
          </div>
        </div>
      );
    }
    return result;
  }
}
