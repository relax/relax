import Component from 'components/component';
import schemaSpecialProperties from 'statics/schema-special-properties';
import schemaStaticProperties from 'statics/schema-static-properties';
import React from 'react';
import PropTypes from 'prop-types';

import Property from './property';
import styles from './linking.less';

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
    addSchemaLink: PropTypes.func.isRequired,
    changeLinkAction: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    overLink: PropTypes.func.isRequired,
    outLink: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    extraLinks: PropTypes.array.isRequired,
    goal: PropTypes.string.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderSchemaDefaults()}
        {this.renderSchemaProperties()}
        {this.renderSpecials()}
        {this.renderExtralinks()}
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

  renderSpecials () {
    const {schema, schemaId} = this.props;

    if (schemaId === 'page' || (schema && schema.type === 'single')) {
      return (
        <div>
          {schemaSpecialProperties.map(this.renderProperty.bind(this, ''))}
        </div>
      );
    }
  }

  renderExtralinks () {
    const {extraLinks} = this.props;

    return extraLinks.map(this.renderExtraLink, this);
  }

  renderExtraLink (extraLink) {
    return (
      <div>
        <div className={styles.label}>{extraLink.label}</div>
        {extraLink.properties.map(this.renderProperty.bind(this, `${extraLink.id}#`))}
      </div>
    );
  }

  renderProperty (prefix, property) {
    const {
      links,
      addSchemaLink,
      changeLinkAction,
      removeLink,
      overLink,
      outLink,
      context,
      goal
    } = this.props;

    return (
      <Property
        key={property.id}
        property={property}
        prefix={prefix}
        links={links && links[prefix + property.id] || []}
        addSchemaLink={addSchemaLink}
        changeLinkAction={changeLinkAction}
        removeLink={removeLink}
        overLink={overLink}
        outLink={outLink}
        context={context}
        goal={goal}
      />
    );
  }
}
