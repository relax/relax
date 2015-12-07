import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import staticProperties from '../../../../helpers/schema-static-properties';
import Property from './property';

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
    pageBuilderActions: PropTypes.object.isRequired,
    selectedSchema: PropTypes.object
  }

  render () {
    const {linkingDataElement} = this.props.pageBuilder;
    const schemaLinks = linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaLinks || {};

    return (
      <div className='linking'>
        {this.props.selectedSchema && staticProperties.map(this.renderProperty.bind(this, schemaLinks, ''))}
        {this.props.selectedSchema && (this.props.schema.properties || []).map(this.renderProperty.bind(this, schemaLinks, 'properties#'))}
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
