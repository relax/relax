import clone from 'lodash.clone';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Checkbox from '../../../../data-types/checkbox';
import Dependencies from './dependencies';
import Input from '../../../../data-types/input';
import OptionsList from '../../../../options-list';
import PropertyTypes from './property-types';
import {TypesProps, dependsOnWhitelist} from '../../../../../data-types';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../../data-types/options-map';

export default class PropertyOptions extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  static contextTypes = {
    selected: PropTypes.object,
    properties: PropTypes.array.isRequired
  }

  onChange (id, value) {
    const changeObj = {};

    changeObj[id] = value;

    if (id === 'type') {
      const typeProps = TypesProps[value];
      if (typeProps) {
        changeObj.default = typeProps.default;
        if (typeProps.defaults) {
          changeObj.props = clone(typeProps.defaults);
        }
      } else {
        changeObj.default = '';
      }
    }

    this.props.onChange(changeObj);
  }

  propChange (id, value) {
    const selected = this.context.selected;
    const typeProps = TypesProps[selected.type];
    const values = merge(clone(typeProps.defaults), selected.props);
    values[id] = value;
    this.props.onChange({
      props: values
    });
  }

  getDepends () {
    const canDependOn = [];
    forEach(this.context.properties, property => {
      if (property.id !== this.context.selected.id && dependsOnWhitelist.indexOf(property.type) !== -1) {
        canDependOn.push(property);
      }
    });
    return canDependOn;
  }

  render () {
    if (this.context.selected) {
      const values = this.context.selected;
      const cannotBeRequired = values.dependencies && values.dependencies.length > 0;

      if (values) {
        return (
          <div>
            <div className='option'>
              <div className='label'>Option title</div>
              <Input type='text' value={values.title} onChange={this.onChange.bind(this, 'title')} />
            </div>
            <div className='option'>
              <div className='label'>Is required {cannotBeRequired && <span className='sub-label'>Properties that depend on others cannot be set as required</span>}</div>
              <Checkbox
                value={values.required}
                onChange={this.onChange.bind(this, 'required')}
                disabled={cannotBeRequired}
              />
            </div>
            <div className='option'>
              <div className='label'>Option Type</div>
              <PropertyTypes value={values.type} onChange={this.onChange.bind(this, 'type')} />
            </div>
            {this.renderOptionsProps()}
            {this.renderDefault()}
            {this.renderDepends()}
          </div>
        );
      }
    } else {
      return (
        <div className=''>
          <div className='none-warning'>
            <div className='none-icon-part'>
              <i className='material-icons'>error_outline</i>
            </div>
            <div className='none-info-part'>
              <p>Select a property on the left to edit</p>
              <p>Or click the add new to add a new property</p>
            </div>
          </div>
        </div>
      );
    }
  }

  renderDepends () {
    const canDependOn = this.getDepends();
    if (canDependOn.length > 0) {
      const values = this.context.selected;
      return (
        <div className='option'>
          <div className='label'>Depends On</div>
          <Dependencies
            dependencies={values.dependencies || []}
            onChange={this.onChange.bind(this, 'dependencies')}
            canDependOn={canDependOn}
          />
        </div>
      );
    }
  }

  renderDefault () {
    const values = this.context.selected;
    const Option = TypesOptionsMap[values.type];

    if (Option) {
      const props = clone(TypesOptionsDefaultProps[values.type] || {});
      merge(props, values.props || {});

      const value = values.default;

      return (
        <div className='option'>
          <div className='label'>Default value</div>
          <Option onChange={this.onChange.bind(this, 'default')} value={value} {...props} OptionsList={OptionsList} />
        </div>
      );
    }
  }

  renderOptionsProps () {
    const selected = this.context.selected;
    const typeProps = TypesProps[selected.type];

    if (typeProps && typeProps.options) {
      const values = merge(clone(typeProps.defaults), selected.props);
      return (
        <OptionsList options={typeProps.options} values={values} onChange={this.propChange.bind(this)} />
      );
    }
  }
}
