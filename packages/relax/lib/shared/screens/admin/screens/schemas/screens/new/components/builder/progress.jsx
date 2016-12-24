import Component from 'components/component';
import React, {PropTypes} from 'react';
import {singleFixedProperties} from 'helpers/data-types';

import styles from './progress.less';

export default class SchemaProgressInfo extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    title: PropTypes.bool,
    properties: PropTypes.bool
  };

  getPropertiesTitles (props) {
    return props.map((prop) => prop.title);
  }

  render () {
    const {schema} = this.props;
    const {type} = schema;
    let result;

    if (type === 'single') {
      result = (
        <div className={styles.option}>
          <i className={'nc-icon-outline design_webpage'} />
          {this.renderTitle()}
          {this.renderProperties()}
        </div>
      );
    } else if (type === 'data') {
      result = (
        <div className={styles.option}>
          <i className={'nc-icon-outline files_single-copy-04'} />
          {this.renderTitle()}
          {this.renderProperties()}
        </div>
      );
    }

    return result;
  }

  renderTitle () {
    const {title, schema} = this.props;

    if (title) {
      return (
        <div className={styles.title}>{schema.title}</div>
      );
    }
  }

  renderProperties () {
    const {properties, schema} = this.props;

    if (properties) {
      let props = [];

      if (schema.type === 'single') {
        props = props.concat(this.getPropertiesTitles(singleFixedProperties));
      }
      if (schema.properties) {
        props = props.concat(this.getPropertiesTitles(schema.properties));
      }

      const propsStr = `${props.slice(0, -1).join(', ')} and ${props[props.length - 1]}`;

      return (
        <div className={styles.properties}>
          {`Contains: ${propsStr}`}
        </div>
      );
    }
  }

  renderProperty () {

  }
}
