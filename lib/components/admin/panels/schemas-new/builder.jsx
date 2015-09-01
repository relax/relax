import React from 'react';
import {Component} from 'relax-framework';
import Combobox from '../../../combobox';
import Checkbox from '../../../checkbox';
import Input from '../../../input';
import merge from 'lodash.merge';
import {Types, TypesProps} from '../../../../types';
import Prop from './prop';
import forEach from 'lodash.foreach';
import clone from 'lodash.clone';

var defaults = {
  id: 'New prop',
  type: 'String',
  required: false
};

export default class SchemasBuilder extends Component {
  getInitialState () {
    return {
      fields: [],
      values: merge({}, defaults),
      selected: false
    };
  }

  onAddSchemaField (event) {
    event.preventDefault();

    const copy = clone(defaults);
    this.state.fields.push(copy);

    this.setState({
      fields: this.state.fields,
      selected: this.state.fields.length - 1
    });

    this.props.onChange(this.state.fields);
  }

  onChange (id, value) {
    this.state.fields[this.state.selected][id] = value;
    this.setState({
      fields: this.state.fields
    });
    this.props.onChange(this.state.fields);
  }

  onRemoveProp (index) {
    this.state.fields.splice(index, 1);
    this.setState({
      fields: this.state.fields,
      selected: false
    });
    this.props.onChange(this.state.fields);
  }

  onEntryClick (id) {
    this.setState({
      selected: id
    });
  }

  renderFieldEntry (field, index) {
    let selected = this.state.selected === index;
    return (
      <Prop selected={selected} prop={field} id={index} onRemove={this.onRemoveProp.bind(this)} key={index} onClick={this.onEntryClick.bind(this, index)} />
    );
  }

  renderFields () {
    return (
      <div>
        {this.renderFieldEntry({
          id: 'Title',
          type: 'String',
          required: true,
          locked: true
        })}
        {this.renderFieldEntry({
          id: 'Slug',
          type: 'String',
          required: true,
          locked: true
        })}
        {this.renderFieldEntry({
          id: 'Date',
          type: 'Date',
          required: true,
          locked: true
        })}
        {this.state.fields.map(this.renderFieldEntry, this)}
      </div>
    );
  }

  renderOptionsProps () {
    let values = this.state.fields[this.state.selected];
    let props = TypesProps[values.type];

    if (props) {
      return 'extra';
    }
  }

  renderOptions () {
    if (this.state.selected !== false) {
      let types = Object.keys(Types).sort();
      let values = this.state.fields[this.state.selected];

      if (values) {
        return (
          <div>
            <div className='option'>
              <div className='label'>Option id</div>
              <Input type='text' value={values.id} label='Option id' onChange={this.onChange.bind(this, 'id')} />
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
              <div className='label'>Is required</div>
              <Checkbox
                value={values.required}
                onChange={this.onChange.bind(this, 'required')}
              />
            </div>
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

  render () {
    return (
      <div>
        <div>Schema properties</div>
        <div className='schema-props-builder'>
          <div className='added'>
            <div className='info-label'>Properties</div>
            {this.renderFields()}
            <div className='add-field-btn' href='#' onClick={this.onAddSchemaField.bind(this)}>
              <i className='material-icons'>add_circle_outline</i>
              <span>Add new property</span>
            </div>
          </div>
          <div className='create'>
            <div className='info-label'>Selected property options</div>
            <div className='create-holder'>
              {this.renderOptions()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchemasBuilder.propTypes = {
  onChange: React.PropTypes.func.isRequired
};
