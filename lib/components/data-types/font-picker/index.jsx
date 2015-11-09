import clone from 'lodash.clone';
import forEach from 'lodash.foreach';
import React from 'react';
import {Component} from 'relax-framework';

import Dropdown from './dropdown';
import Font from '../../font';
import Utils from '../../../utils';

export default class FontPicker extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    fonts: React.PropTypes.object.isRequired
  }

  getChangedValue (key, value) {
    const newValue = clone(this.props.value || {});

    newValue[key] = value;

    if (key === 'family') {
      // check if current fvd exists
      const family = value;
      const fvds = this.props.fonts.fonts[family];

      if (fvds.indexOf(newValue.fvd) === -1) {
        newValue.fvd = fvds[0];
      }
    }

    return newValue;
  }

  onChange (key, value) {
    const newValue = this.getChangedValue(key, value);
    this.props.onChange(newValue);
  }

  render () {
    return (
      <div className='font-picker'>
        {this.renderFont()}
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    const families = [];
    const fvds = [];
    const value = this.props.value;

    if (this.props.fonts && typeof this.props.fonts.fonts === 'object') {
      forEach(this.props.fonts.fonts, (fvdsArray, family) => {
        families.push({
          label: family,
          value: family
        });

        if (value.family && value.family === family) {
          forEach(fvdsArray, (fvd) => {
            fvds.push({
              label: fvd,
              value: fvd
            });
          });
        }
      });
    }

    return (
      <div className='font-picker-options'>
        <Dropdown
          entries={families}
          value={value.family}
          label={Utils.filterFontFamily(value.family || '')}
          onChange={this.onChange.bind(this, 'family')}
        />
        <span className='sep'></span>
        <Dropdown
          entries={fvds}
          value={value.fvd}
          label={value.fvd}
          onChange={this.onChange.bind(this, 'fvd')}
        />
      </div>
    );
  }

  renderFont () {
    if (typeof this.props.value === 'object' && this.props.value.family && this.props.value.fvd) {
      return (
        <Font
          family={this.props.value.family}
          fvd={this.props.value.fvd}
          text={'Abc'}
        />
      );
    } else {
      return (
        <p className='warning'>No font selected yet</p>
      );
    }
  }
}
