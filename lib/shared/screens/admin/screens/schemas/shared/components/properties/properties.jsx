import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {singleFixedProperties} from 'statics/data-types';

import styles from './properties.less';
import Property from './property';

export default class SchemaProperties extends Component {
  static propTypes = {
    openedProperties: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    addProperty: PropTypes.func.isRequired,
    toggleProperty: PropTypes.func.isRequired,
    removeProperty: PropTypes.func.isRequired,
    changePropertySetting: PropTypes.func.isRequired,
    changeSchemaPropertyProp: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  render () {
    const {properties, addProperty, type} = this.props;
    return (
      <div className={styles.root}>
        {type === 'single' && singleFixedProperties.map(this.renderProperty, this)}
        {properties.map(this.renderProperty, this)}
        <button className={styles.addNew} onClick={addProperty}>
          <i className="nc-icon-outline ui-1_circle-add"></i> Add new property
        </button>
      </div>
    );
  }

  renderProperty (property, key) {
    const {
      openedProperties,
      toggleProperty,
      changePropertySetting,
      changeSchemaPropertyProp,
      removeProperty
    } = this.props;

    return (
      <Property
        property={property}
        opened={openedProperties.indexOf(property.id) !== -1}
        toggleProperty={toggleProperty}
        changePropertySetting={changePropertySetting}
        changeSchemaPropertyProp={changeSchemaPropertyProp}
        removeProperty={removeProperty}
        key={key}
      />
    );
  }
}
