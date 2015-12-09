import * as colorsActions from '../../client/actions/colors';
import * as overlayActions from '../../client/actions/overlays';

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
    colorsActions: bindActionCreators(colorsActions, dispatch),
    ...bindActionCreators(overlayActions, dispatch)
  })
)
export default class ColorPalettePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired,
    colorsActions: PropTypes.object.isRequired,
    gradients: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired
  }

  static defaultProps = {
    gradients: false,
    side: 'left'
  }

  getInitState (props = this.props) {
    const color = getColor(props.value || {
      type: 'custom',
      value: '#000000',
      opacity: 100
    }, props.colors);

    return {
      opened: false,
      colr: color.colr,
      opacity: color.opacity,
      label: color.label,
      inputType: 0,
      addingColor: false,
      addingColorName: ''
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.opened && nextProps.value !== this.props.value) {
      this.setState(this.getInitState(nextProps));
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state !== nextState ||
      !this.state.opened ||
      this.props.colors !== nextProps.colors
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
      colr: color.colr,
      label: color.label
    });
  }

  hsvChange (hsv) {
    const colr = Colr.fromHsvObject(hsv);
    const hex = colr.toHex();

    this.props.onChange({
      type: 'custom',
      value: hex,
      opacity: this.state.opacity
    });

    this.setState({
      colr,
      label: hex
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
      colr,
      label: hex
    });
  }

  rgbChange (rgb) {
    const colr = Colr.fromRgbObject(rgb);
    const hex = colr.toHex();

    this.props.onChange({
      type: 'custom',
      value: hex,
      opacity: this.state.opacity
    });

    this.setState({
      colr,
      label: hex
    });
  }

  opacityChange (opacity) {
    this.props.onChange({
      type: this.props.value && this.props.value.type || 'custom',
      value: this.props.value && this.props.value.value || this.state.colr.toHex(),
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

  toggleAddingColor () {
    this.setState({
      addingColor: !this.state.addingColor
    });
  }

  changeAddingColor (addingColorName) {
    this.setState({
      addingColorName
    });
  }

  addColor () {
    if (this.state.addingColorName) {
      this.props.colorsActions
        .addColor({
          color: {
            _id: 1,
            label: 1,
            value: 1
          }
        }, {
          label: this.state.addingColorName,
          value: this.state.colr.toHex()
        })
        .then((result) => {
          this.selectColor(result.addColor._id);
          this.setState({
            addingColor: false,
            addingColorName: ''
          });
        });
    }
  }

  render () {
    return (
      <ColorPalettePicker
        colr={this.state.colr}
        opacity={this.state.opacity}
        label={this.state.label}
        colors={this.props.colors}
        gradients={this.props.gradients}
        side={this.props.side}
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
        addOverlay={this.props.addOverlay}
        closeOverlay={this.props.closeOverlay}
        addingColor={this.state.addingColor}
        addingColorName={this.state.addingColorName}
        toggleAddingColor={::this.toggleAddingColor}
        changeAddingColor={::this.changeAddingColor}
        addColor={::this.addColor}
      />
    );
  }
}
