import * as colorsActions from '../../client/actions/colors';
import * as overlayActions from '../../client/actions/overlays';

import forEach from 'lodash.foreach';
import sortBy from 'lodash.sortby';
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
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired
  }

  static defaultProps = {
    gradients: false
  }

  getInitState (props = this.props) {
    return {
      opened: false,
      inputType: 0,
      addingColor: false,
      addingColorName: '',
      editingPoint: 0
    };
  }

  onChange (changes) {
    this.props.onChange(Object.assign({}, this.props.value || {}, changes));
  }

  selectColor (id) {
    this.valueChange('palette', id);
  }

  hsvChange (hsv) {
    this.valueChange('hsv', hsv);
  }

  hexChange (hex) {
    this.valueChange('hex', hex);
  }

  rgbChange (rgb) {
    this.valueChange('rgb', rgb);
  }

  valueChange (valueType, value) {
    const type = this.props.value && this.props.value.type || 'hex';

    if (type !== 'radial' && type !== 'linear') {
      const currentColor = this.getCurrentColor();
      this.props.onChange({
        type: valueType,
        value,
        opacity: currentColor.opacity
      });
    } else {
      const editingPoint = Math.min(this.state.editingPoint, this.props.value.points.length);
      const points = [];
      forEach(this.props.value.points, (point, index) => {
        if (index === editingPoint) {
          points.push(Object.assign({}, point, {
            type: valueType,
            value
          }));
        } else {
          points.push(point);
        }
      });
      this.props.onChange(Object.assign({}, this.props.value, {points}));
    }
  }

  opacityChange (opacity) {
    const type = this.props.value && this.props.value.type || 'hex';

    if (type !== 'radial' && type !== 'linear') {
      this.props.onChange({
        type: this.props.value && this.props.value.type || 'hex',
        value: this.props.value && this.props.value.value || '#000000',
        opacity: opacity
      });
    } else {
      const editingPoint = Math.min(this.state.editingPoint, this.props.value.points.length);
      const points = [];
      forEach(this.props.value.points, (point, index) => {
        if (index === editingPoint) {
          points.push(Object.assign({}, point, {
            opacity
          }));
        } else {
          points.push(point);
        }
      });
      this.props.onChange(Object.assign({}, this.props.value, {points}));
    }
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
      const color = getColor(this.props.value || {
        type: 'hex',
        value: '#000000',
        opacity: 100
      }, this.props.colors);

      this.props.colorsActions
        .addColor({
          color: {
            _id: 1,
            label: 1,
            value: 1
          }
        }, {
          label: this.state.addingColorName,
          value: color.colr.toHex()
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

  changeToSolid () {
    if (this.props.value.type === 'linear' || this.props.value.type === 'radial') {
      if (this.props.value.type === 'linear') {
        this.previousLinear = this.props.value;
      } else {
        this.previousRadial = this.props.value;
      }
      this.props.onChange({
        type: this.props.value.points[0].type,
        value: this.props.value.points[0].value,
        opacity: this.props.value.points[0].opacity
      });
    }
  }

  changeToLinear () {
    if (this.props.value.type !== 'linear') {
      this.setState({
        editingPoint: 0
      }, () => {
        if (this.props.value.type !== 'radial' && this.previousLinear) {
          this.props.onChange(this.previousLinear);
        } else {
          let points = [];
          if (this.props.value.type === 'radial') {
            points = this.props.value.points;
          } else {
            points = [
              Object.assign({perc: 0}, this.props.value),
              Object.assign({perc: 100}, this.props.value)
            ];
          }

          this.props.onChange({
            type: 'linear',
            angle: 0,
            points
          });
        }
      });
    }
  }

  changeToRadial () {
    if (this.props.value.type !== 'radial') {
      if (this.props.value.type !== 'linear' && this.previousRadial) {
        this.props.onChange(this.previousRadial);
      } else {
        let points = [];
        if (this.props.value.type === 'linear') {
          points = this.props.value.points;
        } else {
          points = [
            Object.assign({perc: 0}, this.props.value),
            Object.assign({perc: 100}, this.props.value)
          ];
        }

        this.props.onChange({
          type: 'radial',
          radius: 'fs',
          center: {
            top: 50,
            left: 50
          },
          points
        });
      }
    }
  }

  changeAngle (angle) {
    this.props.onChange(Object.assign({}, this.props.value, {angle}));
  }

  changeRadius (radius) {
    this.props.onChange(Object.assign({}, this.props.value, {radius}));
  }

  changeCenter (center) {
    this.props.onChange(Object.assign({}, this.props.value, {center}));
  }

  changeEditingPoint (editingPoint) {
    this.setState({
      editingPoint
    });
  }

  pointPercChange (editingPoint, perc) {
    const points = [];
    forEach(this.props.value.points, (point, index) => {
      if (index === editingPoint) {
        points.push(Object.assign({}, point, {
          perc
        }));
      } else {
        points.push(point);
      }
    });
    this.props.onChange(Object.assign({}, this.props.value, {points}));
  }

  addPoint (perc) {
    const orderedPoints = sortBy(this.props.value.points, 'perc');
    let to = 0;
    forEach(orderedPoints, (point, index) => {
      if (point.perc < perc) {
        to = index + 1;
      } else {
        return false;
      }
    });

    let newPoint;
    if (to === 0) {
      newPoint = Object.assign({}, orderedPoints[0], {perc});
    } else if (to === orderedPoints.length) {
      newPoint = Object.assign({}, orderedPoints[orderedPoints.length - 1], {perc});
    } else {
      newPoint = Object.assign({}, orderedPoints[to - 1], {perc});
    }
    const newPoints = this.props.value.points.slice(0);
    newPoints.splice(to, 0, newPoint);
    this.props.onChange(Object.assign({}, this.props.value, {
      points: newPoints
    }));
    this.setState({
      editingPoint: to
    });
  }

  removePoint (index) {
    if (this.props.value.points.length > 2) {
      const newPoints = this.props.value.points.slice(0);
      newPoints.splice(index, 1);
      this.props.onChange(Object.assign({}, this.props.value, {
        points: newPoints
      }));
      this.setState({
        editingPoint: 0
      });
    }
  }

  getCurrentColor () {
    return getColor(this.props.value || {
      type: 'hex',
      value: '#000000',
      opacity: 100
    }, this.props.colors);
  }

  render () {
    const type = this.props.value && this.props.value.type || 'hex';
    let color;

    if (type !== 'linear' && type !== 'radial') {
      color = this.getCurrentColor();
    } else {
      color = getColor(this.props.value.points[Math.min(this.state.editingPoint, this.props.value.points.length)], this.props.colors);
    }

    return (
      <ColorPalettePicker
        type={type}
        colr={color.colr}
        opacity={color.opacity}
        label={color.label}
        value={this.props.value}
        editingPoint={this.state.editingPoint}
        colors={this.props.colors}
        gradients={this.props.gradients}
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
        changeToSolid={::this.changeToSolid}
        changeToLinear={::this.changeToLinear}
        changeToRadial={::this.changeToRadial}
        changeEditingPoint={::this.changeEditingPoint}
        pointPercChange={::this.pointPercChange}
        changeAngle={::this.changeAngle}
        changeRadius={::this.changeRadius}
        changeCenter={::this.changeCenter}
        addPoint={::this.addPoint}
        removePoint={::this.removePoint}
      />
    );
  }
}
