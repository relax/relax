import {Component} from 'relax-framework';
import React from 'react';
import Combobox from '../combobox';
import forEach from 'lodash.foreach';
import cloneDeep from 'lodash.clonedeep';
import Field from './field';

import schemasStore from '../../client/stores/schemas';

export default class SchemaLink extends Component {

  getInitialState () {
    return {
      opened: false
    };
  }

  getInitialCollections () {
    return {
      schemas: schemasStore.getCollection()
    };
  }

  getInitialModels () {
    var models = {};

    if (this.props.value.schema && this.props.value.schema !== '')  {
      models.schema = schemasStore.getModel(this.props.value.schema);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value.schema && nextProps.value.schema !== this.props.value.schema) {
      this.setModels({
        schema: schemasStore.getModel(nextProps.value.schema)
      });
    }
  }

  onSchemaChange (value) {
    var cloned = cloneDeep(this.props.value);
    cloned.schema = value;
    this.props.onChange(cloned);
  }

  changeOpened (id) {
    var value = this.state.opened === id ? false : id;
    this.setState({
      opened: value
    });
  }

  onFieldChange (id, value) {
    var cloned = cloneDeep(this.props.value);
    cloned.fields = cloned.fields || {};
    cloned.fields[id] = value;
    this.props.onChange(cloned);
  }

  renderCombobox () {
    if (this.state.schemas) {
      var props = {
        value: this.props.value.schema || '',
        values: [],
        labels: [],
        onChange: this.onSchemaChange.bind(this)
      };
      forEach(this.state.schemas, (schema) => {
        props.values.push(schema._id);
        props.labels.push(schema.title);
      });

      return (
        <Combobox {...props}/>
      );
    }
  }

  renderField (field) {
    var value = this.props.value && this.props.value.fields && this.props.value.fields[field.id] ? this.props.value.fields[field.id] : {};
    return (
      <Field
        {...field}
        value={value}
        opened={field.id === this.state.opened}
        onClick={this.changeOpened.bind(this)}
        onChange={this.onFieldChange.bind(this)}
      />
    );
  }

  renderFields () {
    if (this.state.schema && this.state.schema.fields) {
      return (
        <div className='fields'>
          {this.renderField({
            id: 'title',
            type: 'String'
          })}
          {this.renderField({
            id: 'date',
            type: 'String'
          })}
          {this.state.schema.fields.map(this.renderField, this)}
        </div>
      );
    }
  }

  render () {
    return (
      <div className='schema-link'>
        {this.renderCombobox()}
        {this.renderFields()}
      </div>
    );
  }
}

SchemaLink.defaultProps = {
  value: {}
};

SchemaLink.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};
