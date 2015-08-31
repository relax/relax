import React from 'react';
import {Component} from 'relax-framework';
import merge from 'lodash.merge';

// options components
import BorderPicker from './border-picker';
import Checkbox from './checkbox';
import Input from './input';
import ImagePicker from './image-picker';
import Combobox from './combobox';
import NumberInput from './number-input';
import FontPicker from './font-picker';
import SchemaLink from './schema-link';
import Button from './button';
import IconPicker from './icon-picker';
import SpacingPicker from './spacing-picker';
import CornersPicker from './corners-picker';
import ColorPalettePicker from './color-palette-picker';
import ColumnsManager from './columns-manager';
import Optional from './optional';

export default class OptionsList extends Component {

  onChange (id, value) {
    this.props.onChange(id, value);
  }

  renderLabel (label) {
    if (label) {
      return (
        <div className='label'>{label}</div>
      );
    }
  }

  renderOption (option) {
    if (OptionsList.optionsMap[option.type]) {
      var Option = OptionsList.optionsMap[option.type];
      var value = this.props.values[option.id];

      var extraProps = merge({}, OptionsList.optionsDefaultProps[option.type] || {});
      merge(extraProps, option.props || {});

      var unlockedContent = null;
      if (option.unlocks && value !== '') {
        if (option.type === 'Optional') {
          if (value && option.unlocks.length > 1) {
            unlockedContent = this.renderOptions(option.unlocks);
          } else if (value && option.unlocks.length === 1) {
            unlockedContent = (
              <div>{this.renderOptions(option.unlocks)}</div>
            );
          }
          extraProps.label = option.label;
        } else if (option.unlocks.constructor === Array) {
          unlockedContent = this.renderOptions(option.unlocks);
        } else if (option.unlocks[value]) {
          unlockedContent = this.renderOptions(option.unlocks[value]);
        }
      }

      return (
        <div className='option' key={option.id}>
          {this.renderLabel(option.type !== 'Optional' && option.label)}
          <Option onChange={this.onChange.bind(this, option.id)} value={value} {...extraProps} OptionsList={OptionsList} />
          {unlockedContent}
        </div>
      );
    }
    else {
      console.log('Element option type not valid');
    }
  }

  renderOptions (options) {
    return (
      <div className='options-group'>
        {options.map(this.renderOption, this)}
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.renderOptions(this.props.options)}
      </div>
    );
  }
}

OptionsList.propTypes = {
  options: React.PropTypes.array.isRequired,
  values: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

OptionsList.optionsMap = {
  Color: ColorPalettePicker,
  String: Input,
  Image: ImagePicker,
  Select: Combobox,
  Number: NumberInput,
  Pixels: NumberInput,
  Percentage: NumberInput,
  Padding: SpacingPicker,
  Margin: SpacingPicker,
  Boolean: Checkbox,
  Font: FontPicker,
  SchemaLink,
  Button,
  Icon: IconPicker,
  Corners: CornersPicker,
  Columns: ColumnsManager,
  Border: BorderPicker,
  Optional
};

OptionsList.optionsDefaultProps = {
  Percentage: {
    min: 0,
    max: 100,
    label: '%'
  },
  Padding: {
    type: 'padding'
  },
  Margin: {
    type: 'margin'
  }
};
