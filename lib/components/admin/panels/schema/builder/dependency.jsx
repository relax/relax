import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import clone from 'lodash.clone';

import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../../data-types/options-map';
import OptionsList from '../../../../options-list';
import Combobox from '../../../../combobox';

export default class Dependency extends Component {
  onChange (key, value) {
    this.props.onChange(this.props.id, key, value);
  }

  onRemove () {
    this.props.onRemove(this.props.id);
  }

  findDependProperty (id) {
    let dependProperty = false;
    forEach(this.props.canDependOn, property => {
      if (this.props.dependency.id === property.id) {
        dependProperty = property;
      }
    });
    return dependProperty;
  }

  renderOption () {
    let dependProperty = this.findDependProperty();

    if (dependProperty) {
      let Option = TypesOptionsMap[dependProperty.type];

      if (Option) {
        let props = clone(TypesOptionsDefaultProps[dependProperty.type] || {});
        merge(props, dependProperty.props || {});

        let value = this.props.dependency.value;

        return (
          <div className='option'>
            <Option onChange={this.onChange.bind(this, 'value')} value={value} {...props} OptionsList={OptionsList} />
          </div>
        );
      }
    }
  }

  render () {
    let propertiesLabels = [];
    let propertiesValues = [];

    forEach(this.props.canDependOn, property => {
      if (this.context.selected.id !== property.id) {
        propertiesLabels.push(property.title);
        propertiesValues.push(property.id);
      }
    });

    return (
      <div className='dependency'>
        <span>Property</span>
        <div className='option'>
          <Combobox
            labels={propertiesLabels}
            values={propertiesValues}
            onChange={this.onChange.bind(this, 'id')}
            value={this.props.dependency.id}
          />
        </div>
        <span>must be</span>
        {this.renderOption()}
        <div className='remove-dependency' onClick={this.onRemove.bind(this)}>
          <i className='material-icons'>delete</i>
        </div>
      </div>
    );
  }
}

Dependency.propTypes = {
  dependency: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

Dependency.contextTypes = {
  selected: React.PropTypes.object.isRequired,
  properties: React.PropTypes.array.isRequired
};
