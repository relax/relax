import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';
import slugify from 'slug';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Property from './property';
import PropertyOptions from './property-options';

const defaults = {
  title: 'New Property',
  type: 'String',
  required: false
};

const staticProps = [
  {
    id: '_title',
    title: 'Title',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: '_slug',
    title: 'Slug',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: '_date',
    title: 'Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: '_updatedDate',
    title: 'Updated Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: '_state',
    title: 'State',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: '_publishedDate',
    title: 'Published date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: '_data',
    title: 'Page builder data',
    type: 'Array',
    required: true,
    locked: true
  }
];

export default class SchemasBuilder extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static childContextTypes = {
    selected: React.PropTypes.object,
    properties: React.PropTypes.array.isRequired
  }

  getInitState () {
    return {
      selected: false
    };
  }

  getChildContext () {
    return {
      selected: this.findFieldById(this.state.selected).property,
      properties: this.props.value
    };
  }

  findFieldById (id, value = this.props.value) {
    var result = false;
    forEach(value, (property, index) => {
      if (property.id === id) {
        result = {
          property,
          index
        };
        return false;
      }
    });
    return result;
  }

  onChange (value) {
    this.props.onChange(value);
  }

  getUniqueId (idParam, count = 0) {
    let id = idParam;
    if (id === '') {
      id = 'unnamed';
    }
    id = slugify(id, {lower: true}).toLowerCase();

    let currentId = count === 0 ? id : id + '-' + count;

    // ensure unique
    forEach(this.props.value, property => {
      if (property.id === currentId) {
        currentId = this.getUniqueId(id, count + 1);
        return false;
      }
    });

    return currentId;
  }

  onAddProperty (event) {
    event.preventDefault();

    const copy = clone(defaults);
    copy.id = this.getUniqueId(copy.title);

    const valuesClone = cloneDeep(this.props.value);
    valuesClone.push(copy);

    this.setState({
      selected: copy.id
    });

    this.onChange(valuesClone);
  }

  onOptionChange (obj) {
    const valuesClone = cloneDeep(this.props.value);
    const selected = this.findFieldById(this.state.selected, valuesClone);
    const selectedProperty = selected.property;

    if (selectedProperty) {
      forEach(obj, (value, id) => {
        selectedProperty[id] = value;

        if (id === 'title') {
          const uniqueId = this.getUniqueId(value);
          selectedProperty.id = uniqueId;

          // look for dependencies
          forEach(valuesClone, (property) => {
            if (property.dependencies) {
              forEach(property.dependencies, dependency => {
                if (dependency.id === this.state.selected) {
                  dependency.id = uniqueId;
                }
              });
            }
          });

          this.state.selected = uniqueId;
        } else if (id === 'dependencies' && value && value.length > 0) {
          selected.required = false;
        }
      });

      this.setState({
        selected: this.state.selected
      });
      this.onChange(valuesClone);
    }
  }

  onRemoveProperty (id) {
    const propertyInfo = this.findFieldById(id);

    if (propertyInfo) {
      const valuesClone = cloneDeep(this.props.value);
      valuesClone.splice(propertyInfo.index, 1);
      this.setState({
        selected: false
      });
      this.onChange(valuesClone);
    }
  }

  onMoveDownProperty (id) {
    const propertyInfo = this.findFieldById(id);

    if (propertyInfo) {
      const valuesClone = cloneDeep(this.props.value);
      const removed = (valuesClone.splice(propertyInfo.index, 1))[0];
      valuesClone.splice(propertyInfo.index + 1, 0, removed);
      this.onChange(valuesClone);
    }
  }

  onMoveUpProperty (id) {
    const propertyInfo = this.findFieldById(id);

    if (propertyInfo) {
      const valuesClone = cloneDeep(this.props.value);
      const removed = (valuesClone.splice(propertyInfo.index, 1))[0];
      valuesClone.splice(propertyInfo.index - 1, 0, removed);
      this.onChange(valuesClone);
    }
  }

  onEntryClick (id) {
    this.setState({
      selected: id
    });
  }

  render () {
    return (
      <div>
        <div>Schema properties</div>
        <div className='schema-props-builder'>
          <div className='added'>
            <div className='info-label'>Properties</div>
            {this.renderProperties()}
            <div className='add-field-btn' href='#' onClick={this.onAddProperty.bind(this)}>
              <i className='material-icons'>add_circle_outline</i>
              <span>Add new property</span>
            </div>
          </div>
          <div className='create'>
            <div className='info-label'>Selected property options</div>
            <div className='create-holder'>
              <PropertyOptions onChange={this.onOptionChange.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderProperties () {
    return (
      <div>
        {staticProps.map(this.renderProperty, this)}
        {this.props.value.map(this.renderProperty, this)}
      </div>
    );
  }

  renderProperty (field, index) {
    const selected = this.state.selected === field.id;
    return (
      <Property
        selected={selected}
        property={field}
        onRemove={this.onRemoveProperty.bind(this)}
        onMoveDown={this.onMoveDownProperty.bind(this)}
        onMoveUp={this.onMoveUpProperty.bind(this)}
        first={index === 0}
        last={index === this.props.value.length - 1}
        key={field.id}
        onClick={this.onEntryClick.bind(this, field.id)}
      />
    );
  }
}
