import clone from 'lodash.clone';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Combobox from '../../../../data-types/combobox';
import OptionsList from '../../../../options-list';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../../data-types/options-map';

export default class Dependency extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dependency: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    canDependOn: PropTypes.array.isRequired
  }

  static contextTypes = {
    selected: PropTypes.object,
    properties: PropTypes.array.isRequired
  }

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

  render () {
    const propertiesLabels = [];
    const propertiesValues = [];

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

  renderOption () {
    const dependProperty = this.findDependProperty();

    if (dependProperty) {
      const Option = TypesOptionsMap[dependProperty.type];

      if (Option) {
        const props = clone(TypesOptionsDefaultProps[dependProperty.type] || {});
        merge(props, dependProperty.props || {});

        const value = this.props.dependency.value;

        return (
          <div className='option'>
            <Option onChange={this.onChange.bind(this, 'value')} value={value} {...props} OptionsList={OptionsList} />
          </div>
        );
      }
    }
  }
}
