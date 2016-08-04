import schemaStaticProperties from 'statics/schema-static-properties';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './linking.less';
import Property from './property';

export default class Linking extends Component {
  static fragments = {
    schema: {
      _id: 1,
      properties: 1,
      type: 1
    }
  };

  static propTypes = {
    schema: PropTypes.object,
    schemaId: PropTypes.string,
    links: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object,
    linkingDataElementId: PropTypes.string.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderSchemaDefaults()}
        {this.renderSchemaProperties()}
      </div>
    );
  }

  renderSchemaDefaults () {
    const {schema, schemaId} = this.props;

    if (schemaId === 'page' || (schema && schema.type === 'single')) {
      return (
        <div>
          {schemaStaticProperties.map(this.renderProperty.bind(this, ''))}
        </div>
      );
    }
  }

  renderSchemaProperties () {
    const {schema, schemaId} = this.props;

    if (schemaId !== 'page' && schema && schema.properties) {
      return (
        <div>
          {schema.properties.map(this.renderProperty.bind(this, 'properties#'))}
        </div>
      );
    }
  }

  renderProperty (prefix, property) {
    const {
      links,
      pageBuilderActions,
      linkingDataElementId
    } = this.props;

    return (
      <Property
        key={property.id}
        property={property}
        prefix={prefix}
        links={links && links[prefix + property.id] || []}
        pageBuilderActions={pageBuilderActions}
        linkingDataElementId={linkingDataElementId}
      />
    );
  }
}
