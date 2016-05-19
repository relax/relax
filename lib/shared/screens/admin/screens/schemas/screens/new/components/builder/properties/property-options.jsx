import bind from 'decorators/bind';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';
import {propertyOptions} from 'helpers/data-types';

import styles from './property-options.less';

export default class SchemaPropertyOptions extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    changePropertySetting: PropTypes.func.isRequired
  };

  @bind
  onChange (id, value) {
    const {changePropertySetting, property} = this.props;
    changePropertySetting(property.id, id, value);
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
        {this.renderDefault()}
      </div>
    );
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
