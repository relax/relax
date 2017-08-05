import * as colorsActions from 'actions/colors';
import Component from 'components/component';
import bind from 'decorators/bind';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import {getColor} from 'helpers/styles/colors';

import ColorPalettePicker from './color-palette-picker';
import Edit from './edit';

const INPUT_TYPES = ['hex', 'rgba', 'hsva'];

@dataConnect(
  null,
  (dispatch) => ({
    colorsActions: bindActionCreators(colorsActions, dispatch)
  }),
  () => ({
    fragments: {
      colors: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    mutations: {
      addColor: [{
        type: 'APPEND',
        field: 'colors'
      }]
    }
  })
)
export default class ColorPalettePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    colors: PropTypes.array,
    colorsActions: PropTypes.object.isRequired,
    gradients: PropTypes.bool,
    showCollection: PropTypes.bool,
    showOpacity: PropTypes.bool,
    white: PropTypes.bool,
    className: PropTypes.string,
    rootClassName: PropTypes.string,
    noPicker: PropTypes.bool
  };

  static defaultProps = {
    colors: [],
    gradients: false,
    showCollection: true,
    showOpacity: true
  };

  getInitState () {
    return {
      opened: false,
      inputType: 0,
      addingColor: false,
      addingColorName: '',
      editingPoint: 0,
      editing: false,
      editingSelected: [],
      editingSelectedColor: null,
      editingColor: false,
      editingColorName: '',
      removeConfirm: false
    };
  }

  @bind
  toggleRemoveConfirm () {
    this.setState({
      removeConfirm: !this.state.removeConfirm
    });
  }

  @bind
  onChange (changes) {
    this.props.onChange(Object.assign({}, this.props.value, changes));
  }

  @bind
  selectColor (id) {
    this.valueChange('palette', id);
  }

  @bind
  hsvChange (hsv) {
    this.valueChange('hsv', hsv);
  }

  @bind
  hexChange (hex) {
    this.valueChange('hex', hex);
  }

  @bind
  rgbChange (rgb) {
    this.valueChange('rgb', rgb);
  }

  valueChange (valueType, value) {
    const type = this.props.value && this.props.value.type || 'hex';

    if (type !== 'radial' && type !== 'linear') {
      const {editing, editingSelected} = this.state;
      const currentColor = this.getCurrentColor();

      if (editing) {
        if (editingSelected.length === 1) {
          this.setState({
            editingSelectedColor: {
              type: valueType,
              value,
              opacity: 100
            }
          });
        }
      } else {
        this.props.onChange({
          type: valueType,
          value,
          opacity: currentColor.opacity
        });
      }
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

  @bind
  opacityChange (opacity) {
    const type = this.props.value && this.props.value.type || 'hex';

    if (type !== 'radial' && type !== 'linear') {
      this.props.onChange({
        type: this.props.value && this.props.value.type || 'hex',
        value: this.props.value && this.props.value.value || '#000000',
        opacity
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

  @bind
  toggleOpened () {
    this.setState({
      opened: !this.state.opened,
      addingColor: false,
      addingColorName: '',
      editing: false,
      editingSelected: [],
      editingSelectedColor: null,
      editingColor: false,
      editingColorName: ''
    });
  }

  @bind
  previousInputType () {
    this.setState({
      inputType: this.state.inputType === 0 ? INPUT_TYPES.length - 1 : this.state.inputType - 1
    });
  }

  @bind
  nextInputType () {
    this.setState({
      inputType: this.state.inputType === INPUT_TYPES.length - 1 ? 0 : this.state.inputType + 1
    });
  }

  @bind
  toggleAddingColor () {
    this.setState({
      addingColor: !this.state.addingColor
    });
  }

  @bind
  changeAddingColor (addingColorName) {
    this.setState({
      addingColorName
    });
  }

  @bind
  addColor () {
    if (this.state.addingColorName) {
      const color = getColor(this.props.value || {
        type: 'hex',
        value: '#000000',
        opacity: 100
      }, this.props.colors);

      this.setState({
        addingColor: true
      });

      this.props.colorsActions
        .addColor({
          label: this.state.addingColorName,
          value: color.colr.toHex()
        }, (result) => {
          this.selectColor(result.addColor._id);
          this.setState({
            addingColor: false,
            addingColorName: ''
          });
        });
    }
  }

  @bind
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

  @bind
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

  @bind
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

  @bind
  changeAngle (angle) {
    this.props.onChange(Object.assign({}, this.props.value, {angle}));
  }

  @bind
  changeRadius (radius) {
    this.props.onChange(Object.assign({}, this.props.value, {radius}));
  }

  @bind
  changeCenter (center) {
    this.props.onChange(Object.assign({}, this.props.value, {center}));
  }

  @bind
  changeEditingPoint (editingPoint) {
    this.setState({
      editingPoint
    });
  }

  @bind
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

  @bind
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

  @bind
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

  @bind
  toggleEditing () {
    this.setState({
      editing: !this.state.editing,
      addingColor: false,
      editingSelectedColor: null
    });
  }

  @bind
  toggleEditingSelectedColor (id) {
    const {editingSelected} = this.state;
    const index = editingSelected.indexOf(id);

    if (index === -1) {
      // select
      this.setState({
        editingSelected: [...editingSelected, id],
        editingColor: false
      });
    } else {
      // unselect
      const newSelected = editingSelected.slice(0);
      newSelected.splice(index, 1);
      this.setState({
        editingSelected: newSelected,
        editingColor: false
      });
    }
  }

  @bind
  toggleEditingColor () {
    const {editingSelected} = this.state;
    const {colors} = this.props;

    if (editingSelected.length === 1) {
      const colorId = editingSelected[0];
      const color = find(colors, {_id: colorId});

      if (color) {
        this.setState({
          editingColor: true,
          editingColorName: color.label
        });
      }
    }
  }

  @bind
  changeEditingColorName (value) {
    this.setState({
      editingColorName: value
    });
  }

  @bind
  removeSelectedColors () {
    const {editingSelected} = this.state;

    this.props.colorsActions.removeColors(editingSelected);

    this.setState({
      editingSelected: [],
      removeConfirm: false
    });
  }

  @bind
  updateSelectedName () {
    const {editingSelected, editingColorName} = this.state;
    const {colors} = this.props;

    const colorId = editingSelected[0];
    const color = find(colors, {_id: colorId});

    if (color) {
      this.props.colorsActions.updateColor(Object.assign({}, color, {
        label: editingColorName
      }));
      this.setState({
        editingColor: false
      });
    }
  }

  @bind
  cancelSelectedColorEdit () {
    this.setState({
      editingSelectedColor: null
    });
  }

  @bind
  updateSelectedColorEdit () {
    const {colors} = this.props;
    const {editing, editingSelectedColor, editingSelected} = this.state;

    if (editing && editingSelectedColor && editingSelected.length === 1) {
      const color = find(colors, {_id: editingSelected[0]});

      if (color) {
        const colorObject = this.getCurrentColor();

        this.props.colorsActions.updateColor(Object.assign({}, color, {
          value: colorObject.colr.toHex()
        }));

        this.setState({
          editingSelectedColor: null
        });
      }
    }
  }

  getCurrentColor () {
    const {colors} = this.props;
    const value = this.getValidValue();

    return getColor(value, colors);
  }

  getValidValue () {
    const {value, colors} = this.props;
    const {editing, editingSelectedColor, editingSelected} = this.state;

    // when in edit mode and one color is selected
    let selectedColor;
    if (editing && !editingSelectedColor && editingSelected.length === 1) {
      const color = find(colors, {_id: editingSelected[0]});

      if (color) {
        selectedColor = {
          value: color.value
        };
      }
    }

    return Object.assign({
      type: 'hex',
      value: '#000000',
      opacity: 100
    }, editingSelectedColor || selectedColor || value);
  }

  render () {
    const {noPicker} = this.props;
    const value = this.getValidValue();

    const type = value.type;
    let color;

    if (type !== 'linear' && type !== 'radial') {
      color = this.getCurrentColor();
    } else {
      color = getColor(
        value.points[Math.min(this.state.editingPoint, value.points.length)],
        this.props.colors
      );
    }

    const Comp = noPicker && Edit || ColorPalettePicker;

    return (
      <Comp
        white={this.props.white}
        className={this.props.className}
        rootClassName={this.props.rootClassName}
        type={type}
        noPicker={noPicker}
        colr={color.colr}
        opacity={color.opacity}
        label={color.label}
        value={value}
        removeConfirm={this.state.removeConfirm}
        editing={this.state.editing}
        editingSelected={this.state.editingSelected}
        editingSelectedColor={this.state.editingSelectedColor}
        editingColor={this.state.editingColor}
        editingColorName={this.state.editingColorName}
        editingPoint={this.state.editingPoint}
        colors={this.props.colors}
        gradients={this.props.gradients && !this.state.editing}
        showCollection={this.props.showCollection}
        showOpacity={this.props.showOpacity && !this.state.editing}
        colorPickerDisabled={this.state.editing && this.state.editingSelected.length !== 1}
        opened={this.state.opened}
        onChange={this.onChange}
        toggleOpened={this.toggleOpened}
        colorsActions={this.props.colorsActions}
        hsvChange={this.hsvChange}
        hexChange={this.hexChange}
        rgbChange={this.rgbChange}
        opacityChange={this.opacityChange}
        inputType={INPUT_TYPES[this.state.inputType]}
        previousInputType={this.previousInputType}
        nextInputType={this.nextInputType}
        selectColor={this.selectColor}
        addingColor={this.state.addingColor}
        addingColorName={this.state.addingColorName}
        toggleAddingColor={this.toggleAddingColor}
        changeAddingColor={this.changeAddingColor}
        addColor={this.addColor}
        changeToSolid={this.changeToSolid}
        changeToLinear={this.changeToLinear}
        changeToRadial={this.changeToRadial}
        changeEditingPoint={this.changeEditingPoint}
        pointPercChange={this.pointPercChange}
        changeAngle={this.changeAngle}
        changeRadius={this.changeRadius}
        changeCenter={this.changeCenter}
        addPoint={this.addPoint}
        removePoint={this.removePoint}
        toggleEditing={this.toggleEditing}
        toggleEditingSelectedColor={this.toggleEditingSelectedColor}
        toggleEditingColor={this.toggleEditingColor}
        changeEditingColorName={this.changeEditingColorName}
        removeSelectedColors={this.removeSelectedColors}
        updateSelectedName={this.updateSelectedName}
        cancelSelectedColorEdit={this.cancelSelectedColorEdit}
        updateSelectedColorEdit={this.updateSelectedColorEdit}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
      />
    );
  }
}
