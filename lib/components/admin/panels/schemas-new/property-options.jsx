import React from 'react';
import {Component} from 'relax-framework';
import merge from 'lodash.merge';
import clone from 'lodash.clone';

import {TypesProps} from '../../../../data-types';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../data-types/options-map';

import Dependencies from './dependencies';
import PropertyTypes from './property-types';
import OptionsList from '../../../options-list';
import Checkbox from '../../../checkbox';
import Input from '../../../input';

export default class PropertyOptions extends Component {
  onChange (id, value) {
    let changeObj = {};

    changeObj[id] = value;

    if (id === 'type') {
      let typeProps = TypesProps[value];
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
    let selected = this.context.selected;
    let typeProps = TypesProps[selected.type];
    let values = merge(clone(typeProps.defaults), selected.props);
    values[id] = value;
    this.props.onChange({
      props: values
    });
  }

  renderOptionsProps () {
    let selected = this.context.selected;
    let typeProps = TypesProps[selected.type];

    if (typeProps && typeProps.options) {
      let values = merge(clone(typeProps.defaults), selected.props);
      return (
        <OptionsList options={typeProps.options} values={values} onChange={this.propChange.bind(this)} />
      );
    }
  }

  renderDefault () {
    let values = this.context.selected;
    let Option = TypesOptionsMap[values.type];

    if (Option) {
      let props = clone(TypesOptionsDefaultProps[values.type] || {});
      merge(props, values.props || {});

      let value = values.default;

      return (
        <div className='option'>
          <div className='label'>Default value</div>
          <Option onChange={this.onChange.bind(this, 'default')} value={value} {...props} OptionsList={OptionsList} />
        </div>
      );
    }
  }

  render () {
    if (this.context.selected) {
      let values = this.context.selected;
      let cannotBeRequired = values.dependencies && values.dependencies.length > 0;

      if (values) {
        return (
          <div>
            <div className='option'>
              <div className='label'>Option title</div>
              <Input type='text' value={values.title} onChange={this.onChange.bind(this, 'title')} />
            </div>
            <div className='option'>
              <div className='label'>Option id</div>
              <Input type='text' value={values.id} disabled={true} />
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
            {this.context.properties.length > 1 &&
              <div className='option'>
                <div className='label'>Depends On</div>
                <Dependencies
                  dependencies={values.dependencies || []}
                  onChange={this.onChange.bind(this, 'dependencies')}
                />
              </div>
            }

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
}

PropertyOptions.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

PropertyOptions.contextTypes = {
  selected: React.PropTypes.object.isRequired,
  properties: React.PropTypes.array.isRequired
};
