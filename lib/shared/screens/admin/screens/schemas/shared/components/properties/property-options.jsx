import bind from 'decorators/bind';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import React from 'react';
import PropTypes from 'prop-types';
import {propertyOptions, typesProps} from 'statics/data-types';

import styles from './property-options.less';

export default class SchemaPropertyOptions extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    changePropertySetting: PropTypes.func.isRequired,
    changeSchemaPropertyProp: PropTypes.func.isRequired
  };

  @bind
  onChange (id, value) {
    const {changePropertySetting, property} = this.props;
    changePropertySetting(property.id, id, value);
  }

  @bind
  onChangeProp (id, value) {
    const {changeSchemaPropertyProp, property} = this.props;
    changeSchemaPropertyProp(property.id, id, value);
  }

  render () {
    const {property} = this.props;
    return (
      <div className={styles.root}>
        <OptionsList
          options={propertyOptions}
          values={property}
          onChange={this.onChange}
          white
        />
        {this.renderTypeOptions()}
        {this.renderDefault()}
      </div>
    );
  }

  renderTypeOptions () {
    const {property} = this.props;
    const typeOptions = property.type && typesProps[property.type];

    if (typeOptions && typeOptions.options) {
      return (
        <OptionsList
          options={typeOptions.options}
          values={Object.assign({}, typeOptions.defaults, property.props)}
          onChange={this.onChangeProp}
          white
        />
      );
    }
  }

  renderDefault () {
    const {property} = this.props;

    if (property.type) {
      const options = [{
        id: 'default',
        label: 'Default',
        type: property.type
      }];
      const values = {
        default: property.default
      };

      return (
        <OptionsList
          options={options}
          values={values}
          onChange={this.onChange}
          white
        />
      );
    }
  }
}
