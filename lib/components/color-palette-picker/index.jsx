import {Component} from 'relax-framework';
import React from 'react';
import NumberInput from '../number-input';
import List from './list';
import HexEdit from './hex-edit';
// import Colors from '../../colors';
import clone from 'lodash.clone';
import cx from 'classnames';

export default class ColorPicker extends Component {
  getInitialState () {
    return {
      opened: false,
      hexLightbox: false
    };
  }

  onOpacityChange (opacity) {
    var value = clone(this.props.value);
    value.opacity = opacity;
    this.props.onChange(value);
  }

  onHexChange (event) {
    var value = clone(this.props.value);
    value.type = 'custom';
    value.value = event.target.value;
    this.props.onChange(value);
  }

  onEntryClick (id) {
    var value = clone(this.props.value);
    value.type = 'palette';
    value.value = id;
    this.props.onChange(value);
    this.setState({
      opened: false
    });
  }

  toggleOpen (event) {
    event.preventDefault();
    this.setState({
      opened: !this.state.opened
    });
  }

  openEditColor (event) {
    event.preventDefault();
    this.setState({
      hexLightbox: true
    });
  }
  closeEditColor () {
    this.setState({
      hexLightbox: false
    });
  }
  submitEditColor (hex) {
    var value = clone(this.props.value);
    value.type = 'custom';
    value.value = hex;
    this.props.onChange(value);
    this.closeEditColor();
  }

  renderHexLightbox (hex) {
    if (this.state.hexLightbox) {
      return <HexEdit onClose={this.closeEditColor.bind(this)} onSubmit={this.submitEditColor.bind(this)} value={hex} />;
    }
  }

  renderContent (color) {
    if (this.state.opened) {
      return <List onEntryClick={this.onEntryClick.bind(this)} selected={this.props.value.value} />;
    } else {
      const hex = color.colr.toHex();
      const hexString = this.props.value.type === 'palette' ? hex : this.props.value.value;

      return (
        <div className='color-info'>
          <div className='color-value-holder'>
            <div className='color-value-preview' style={{backgroundColor: hex}} onClick={this.openEditColor.bind(this)}></div>
            <input className='color-value' value={hexString} onChange={this.onHexChange.bind(this)}></input>
          </div>
          <div className='color-opacity-holder'>
            <NumberInput onChange={this.onOpacityChange.bind(this)} value={this.props.value.opacity} label='%' min={0} max={100} />
          </div>
          {this.renderHexLightbox(hex)}
        </div>
      );
    }
  }

  render () {
    const color = Colors.getColor(this.props.value);
    const colorString = Colors.getColorString(color);
    const hsl = color.colr.toHslObject();
    var colorStyle = {
      backgroundColor: colorString,
      borderColor: colorString
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

}

ColorPicker.propTypes = {
  value: React.PropTypes.object,
  onChange: React.PropTypes.func
};

ColorPicker.defaultProps = {
  value: {
    type: 'custom',
    value: '#000000',
    opacity: 100
  }
};
