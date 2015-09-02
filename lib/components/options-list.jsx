import React from 'react';
import {Component} from 'relax-framework';
import merge from 'lodash.merge';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../data-types/options-map';

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
    if (TypesOptionsMap[option.type]) {
      var Option = TypesOptionsMap[option.type];
      var value = this.props.values[option.id];

      var extraProps = merge({}, TypesOptionsDefaultProps[option.type] || {});
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
