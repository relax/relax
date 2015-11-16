import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Property from './property';

const staticProperties = [
  {
    id: 'title',
    title: 'Title',
    type: 'String'
  },
  {
    id: 'slug',
    title: 'Slug',
    type: 'String'
  },
  {
    id: 'date',
    title: 'Created Date',
    type: 'Date'
  },
  {
    id: 'publishedDate',
    title: 'Published Date',
    type: 'Date'
  },
  {
    id: 'updatedDate',
    title: 'Updated Date',
    type: 'Date'
  }
];

export default class Linking extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1,
      properties: 1
    }
  }

  static propTypes = {
    schema: PropTypes.object.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  render () {
    const {linkingDataElement} = this.props.pageBuilder;
    const schemaLinks = linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaLinks || {};

    return (
      <div className='linking'>
        {staticProperties.map(this.renderProperty.bind(this, schemaLinks, ''))}
        {(this.props.schema.properties || []).map(this.renderProperty.bind(this, schemaLinks, 'properties#'))}
      </div>
    );
  }

  renderProperty (schemaLinks, prefix, property) {
    return (
      <Property
        key={property.id}
        property={property}
        prefix={prefix}
        addOverlay={this.props.addOverlay}
        closeOverlay={this.props.closeOverlay}
        links={schemaLinks[prefix + property.id] || []}
        pageBuilder={this.props.pageBuilder}
        pageBuilderActions={this.props.pageBuilderActions}
      />
    );
  }
}
