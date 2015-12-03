import * as colorsActions from '../../client/actions/colors';

import find from 'lodash.find';
import Colr from 'colr';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import ColorPalettePicker from '../../components/data-types/color-palette-picker';
import {getColor} from '../../helpers/colors';

const INPUT_TYPES = ['hex', 'rgba', 'hsva'];

@connect(
  (state) => ({
    colors: state.colors.data
  }),
  (dispatch) => ({
    colorsActions: bindActionCreators(colorsActions, dispatch)
  })
)
export default class ColorPalettePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired,
    colorsActions: PropTypes.object.isRequired
  }

  getInitState () {
    const color = getColor(this.props.value || {
      type: 'custom',
      value: '#000000',
      opacity: 100
    }, this.props.colors);

    return {
      opened: false,
      colr: color.colr,
      opacity: color.opacity,
      inputType: 0
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.opened !== nextState.opened ||
      this.state.colr !== nextState.colr ||
      this.state.opacity !== nextState.opacity ||
      this.state.inputType !== nextState.inputType
    );
  }

  onChange (changes) {
    this.props.onChange(Object.assign({}, this.props.value || {}, changes));
  }

  selectColor (id) {
    const value = {
      type: 'palette',
      value: id,
      opacity: this.state.opacity
    };
    const color = getColor(value, this.props.colors);
    this.props.onChange(value);
    this.setState({
      colr: color.colr
    });
  }

  hsvChange (hsv) {
    const colr = Colr.fromHsvObject(hsv);

    this.props.onChange({
      type: 'custom',
      value: colr.toHex(),
      opacity: this.state.opacity
    });

    this.setState({
      colr
    });
  }

  hexChange (hex) {
    const colr = Colr.fromHex(hex);

    this.props.onChange({
      type: 'custom',
      value: hex,
      opacity: this.state.opacity
    });

    this.setState({
      colr
    });
  }

  rgbChange (rgb) {
    const colr = Colr.fromRgbObject(rgb);

    this.props.onChange({
      type: 'custom',
      value: colr.toHex(),
      opacity: this.state.opacity
    });

    this.setState({
      colr
    });
  }

  opacityChange (opacity) {
    this.props.onChange({
      type: this.props.value && this.props.value.type || 'custom',
      value: this.state.colr.toHex(),
      opacity
    });

    this.setState({
      opacity
    });
  }

  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  previousInputType () {
    this.setState({
      inputType: this.state.inputType === 0 ? INPUT_TYPES.length - 1 : this.state.inputType - 1
    });
  }

  nextInputType () {
    this.setState({
      inputType: this.state.inputType === INPUT_TYPES.length - 1 ? 0 : this.state.inputType + 1
    });
  }

  render () {
    return (
      <ColorPalettePicker
        colr={this.state.colr}
        opacity={this.state.opacity}
        colors={this.props.colors}
        opened={this.state.opened}
        onChange={::this.onChange}
        toggleOpened={::this.toggleOpened}
        colorsActions={this.props.colorsActions}
        hsvChange={::this.hsvChange}
        hexChange={::this.hexChange}
        rgbChange={::this.rgbChange}
        opacityChange={::this.opacityChange}
        inputType={INPUT_TYPES[this.state.inputType]}
        previousInputType={::this.previousInputType}
        nextInputType={::this.nextInputType}
        selectColor={::this.selectColor}
      />
    );
  }
}
