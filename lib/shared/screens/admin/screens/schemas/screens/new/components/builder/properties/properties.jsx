import Component from 'components/component';
import React, {PropTypes} from 'react';
import {singleFixedProperties} from 'helpers/data-types';

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
    type: PropTypes.string.isRequired
  };

  render () {
    const {properties, addProperty, type} = this.props;
    return (
      <div className={styles.root}>
        {type === 'single' && singleFixedProperties.map(this.renderProperty, this)}
        {properties.map(this.renderProperty, this)}
        <button className={styles.addNew} onClick={addProperty}>
          Add new property
        </button>
      </div>
    );
  }

  renderProperty (property, key) {
    const {openedProperties, toggleProperty, changePropertySetting, removeProperty} = this.props;
    return (
      <Property
        property={property}
        opened={openedProperties.indexOf(property.id) !== -1}
        toggleProperty={toggleProperty}
        changePropertySetting={changePropertySetting}
        removeProperty={removeProperty}
        key={key}
      />
    );
  }
}
