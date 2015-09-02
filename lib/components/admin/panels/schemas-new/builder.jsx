import React from 'react';
import {Component} from 'relax-framework';
import clone from 'lodash.clone';
import forEach from 'lodash.foreach';
import slugify from 'slug';

import Property from './property';
import PropertyOptions from './property-options';

var defaults = {
  title: 'New Property',
  type: 'String',
  required: false
};

export default class SchemasBuilder extends Component {
  getInitialState () {
    return {
      properties: [],
      selected: false
    };
  }

  getChildContext () {
    return {
      selected: this.state.selected,
      properties: this.state.properties
    };
  }

  findFieldById (id) {
    var result = null;
    forEach(this.state.properties, (property, index) => {
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

  onChange () {
    this.props.onChange(this.state.properties);
  }

  getUniqueId (id, count = 0) {
    if (id === '') {
      id = 'unnamed';
    }

    id = slugify(id, {lower: true}).toLowerCase();

    let currentId = count === 0 ? id : id + '-' + count;

    // ensure unique
    forEach(this.state.properties, property => {
      if (property.id === currentId) {
        currentId = this.getUniqueId(id, count+1);
        return false;
      }
    });

    return currentId;
  }

  onAddProperty (event) {
    event.preventDefault();

    const copy = clone(defaults);
    copy.id = this.getUniqueId(copy.title);

    this.state.properties.push(copy);

    this.setState({
      properties: this.state.properties,
      selected: copy
    });

    this.onChange();
  }

  onOptionChange (id, value) {
    this.state.selected[id] = value;

    if (id === 'title') {
      let uniqueId = this.getUniqueId(value);

      // look for dependencies
      forEach(this.state.properties, property => {
        if (property.dependencies) {
          forEach(property.dependencies, dependency => {
            if (dependency.id === this.state.selected.id) {
              dependency.id = uniqueId;
            }
          });
        }
      });

      this.state.selected.id = uniqueId;
    } else if (id === 'dependencies' && value && value.length > 0) {
      this.state.selected.required = false;
    }

    this.setState({
      properties: this.state.properties
    });
    this.onChange();
  }

  onRemoveProperty (id) {
    let propertyInfo = this.findFieldById(id);

    if (propertyInfo) {
      this.state.properties.splice(propertyInfo.index, 1);
      this.setState({
        properties: this.state.properties,
        selected: false
      });
      this.onChange();
    }
  }

  onEntryClick (id) {
    let propertyInfo = this.findFieldById(id);

    if (propertyInfo) {
      this.setState({
        selected: propertyInfo.property
      });
    }
  }

  renderProperty (field) {
    let selected = this.state.selected && this.state.selected.id === field.id;
    return (
      <Property
        selected={selected}
        property={field}
        onRemove={this.onRemoveProperty.bind(this)}
        key={field.id}
        onClick={this.onEntryClick.bind(this, field.id)}
      />
    );
  }

  renderProperties () {
    return (
      <div>
        {this.renderProperty({
          id: 'title',
          title: 'Title',
          type: 'String',
          required: true,
          locked: true
        })}
        {this.renderProperty({
          id: 'slug',
          title: 'Slug',
          type: 'String',
          required: true,
          locked: true
        })}
        {this.renderProperty({
          id: 'date',
          title: 'Date',
          type: 'Date',
          required: true,
          locked: true
        })}
        {this.state.properties.map(this.renderProperty, this)}
      </div>
    );
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
}

SchemasBuilder.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

SchemasBuilder.childContextTypes = {
  selected: React.PropTypes.object.isRequired,
  properties: React.PropTypes.array.isRequired
};
