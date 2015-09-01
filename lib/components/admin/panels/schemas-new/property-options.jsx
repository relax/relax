import React from 'react';
import {Component} from 'relax-framework';
import {Types, TypesProps} from '../../../../types';
import merge from 'lodash.merge';
import clone from 'lodash.clone';

import Dependencies from './dependencies';
import OptionsList from '../../../options-list';
import Combobox from '../../../combobox';
import Checkbox from '../../../checkbox';
import Input from '../../../input';

export default class PropertyOptions extends Component {
  onChange (id, value) {
    this.props.onChange(id, value);
  }

  propChange (id, value) {
    let selected = this.context.selected;
    let typeProps = TypesProps[selected.type];
    let values = merge(clone(typeProps.defaults), selected.props);
    values[id] = value;
    this.props.onChange('props', values);
  }

  renderOptionsProps () {
    let selected = this.context.selected;
    let typeProps = TypesProps[selected.type];

    if (typeProps) {
      let values = merge(clone(typeProps.defaults), selected.props);
      return (
        <OptionsList options={typeProps.options} values={values} onChange={this.propChange.bind(this)} />
      );
    }
  }

  render () {
    if (this.context.selected) {
      let types = Object.keys(Types).sort();
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
              <div className='label'>Type</div>
              <Combobox
                labels={types}
                values={types}
                onChange={this.onChange.bind(this, 'type')}
                value={values.type}
              />
            </div>
            {this.renderOptionsProps()}
            <div className='option'>
              <div className='label'>Is required {cannotBeRequired && <span className='sub-label'>Properties that depend on others cannot be set as required</span>}</div>

              <Checkbox
                value={values.required}
                onChange={this.onChange.bind(this, 'required')}
                disabled={cannotBeRequired}
              />
            </div>
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
