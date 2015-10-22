import React from 'react';
import {Component} from 'relax-framework';
import SchemaProperty from './schema-property';

import schemasStore from '../../../../../../client/stores/schemas';

const colors = [
  '#ab0000',
  '#008331',
  '#ff8d00',
  '#006583',
  '#a7be0d',
  '#be0d0d',
  '#44e3e9',
  '#972496',
  '#72c639'
];

export default class SchemaProperties extends Component {
  getInitialModels () {
    var models = {};

    if (this.props.schemaSlug)  {
      models.schema = schemasStore.getModel(this.props.schemaSlug);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.schemaSlug && nextProps.schemaSlug !== this.props.schemaSlug) {
      this.setModels({
        schema: schemasStore.getModel(nextProps.schemaSlug)
      });
    }
  }

  getColorIndex (index) {
    return index > colors.length ? this.getColorIndex(index - colors.length) : index;
  }

  renderProperty (property, index) {
    let colorIndex = this.getColorIndex(index);

    return (
      <SchemaProperty property={property} color={colors[colorIndex]} key={index} />
    );
  }

  renderProperties () {
    let schemaProperties = (this.state.schema && this.state.schema.properties) || (this.context.schema && this.context.schema.properties);

    if (schemaProperties) {
      let properties = [
        {
          id: '_title',
          title: 'Title',
          type: 'String'
        },
        {
          id: '_publishedDate',
          title: 'Published Date',
          type: 'Date'
        }
      ];
      properties = properties.concat(schemaProperties);

      return (
        <div className='schema-properties'>
          {properties.map(this.renderProperty, this)}
        </div>
      );
    }
  }

  render () {
    return (
      <div className='option'>
        <div className='label'>Schema properties</div>
        {this.renderProperties()}
      </div>
    );
  }
}

SchemaProperties.contextTypes = {
  schema: React.PropTypes.object
};
