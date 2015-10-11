import {Component} from 'relax-framework';
import React from 'react';
import Font from '../font';
import Utils from '../../utils';
import Dropdown from './dropdown';
import clone from 'lodash.clone';
import forEach from 'lodash.foreach';

// import settingsStore from '../../client/stores/settings';

export default class FontPicker extends Component {

  getInitialState () {
    return {
      data: {}
    };
  }

  getChangedValue (key, value) {
    var newValue = clone(this.props.value || {});

    newValue[key] = value;

    if (key === 'family') {
      // check if current fvd exists
      var family = value;
      var fvds = this.state.data.value.fonts[family];

      if (fvds.indexOf(newValue.fvd) === -1) {
        newValue.fvd = fvds[0];
      }
    }

    return newValue;
  }

  onChange (key, value) {
    var newValue = this.getChangedValue(key, value);
    this.props.onChange(newValue);
    this.setState({
      selected: newValue
    });
  }

  tempChange (key, value) {
    var newValue = this.getChangedValue(key, value);
    this.props.onChange(newValue);
  }

  tempRevert () {
    this.props.onChange(this.state.selected);
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

  renderOptions () {
    var families = [], fvds = [];
    var value = this.props.value || {};

    if (this.state.data.value && typeof this.state.data.value.fonts === 'object') {
      forEach(this.state.data.value.fonts, (fvdsArray, family) => {
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
          tempChange={this.tempChange.bind(this, 'family')}
          tempRevert={this.tempRevert.bind(this)} />
        <span className='sep'></span>
        <Dropdown
          entries={fvds}
          value={value.fvd}
          label={value.fvd}
          onChange={this.onChange.bind(this, 'fvd')}
          tempChange={this.tempChange.bind(this, 'fvd')}
          tempRevert={this.tempRevert.bind(this)} />
      </div>
    );
  }

  render () {
    return (
      <div className='font-picker'>
        {this.renderFont()}
        {this.renderOptions()}
      </div>
    );
  }
}

FontPicker.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};
