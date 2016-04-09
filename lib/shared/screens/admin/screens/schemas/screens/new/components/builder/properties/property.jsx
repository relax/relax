import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './property.less';
import PropertyOptions from './property-options';

export default class SchemaProperty extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    opened: PropTypes.bool.isRequired,
    toggleProperty: PropTypes.func.isRequired,
    changePropertySetting: PropTypes.func.isRequired
  };

  @bind
  onToggle () {
    const {toggleProperty, property} = this.props;
    toggleProperty(property.id);
  }

  render () {
    const {property} = this.props;
    return (
      <div className={cx(styles.root, property.locked && styles.locked)}>
        <div className={styles.header} onClick={this.onToggle}>
          <div className={styles.info}>
            <div className={styles.title}>{property.title}</div>
            <div className={styles.id}>{property.id}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.type}>{property.type}</div>
            {this.renderIcon()}
          </div>
        </div>
        {this.renderOpened()}
      </div>
    );
  }

  renderIcon () {
    const {opened, property} = this.props;
    let result;
    if (property.locked) {
      result = (
        <i className={cx(styles.icon, 'nc-icon-mini business_pin')} />
      );
    } else {
      result = (
        <i className={cx(
            styles.icon,
            'nc-icon-mini',
            opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
          )}
        />
      );
    }
    return result;
  }

  renderOpened () {
    const {opened, property} = this.props;
    if (opened && !property.locked) {
      const {changePropertySetting} = this.props;
      return (
        <PropertyOptions
          property={property}
          changePropertySetting={changePropertySetting}
        />
      );
    }
  }
}
