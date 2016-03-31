import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './property.less';

export default class SchemaProperty extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  render () {
    const {title, id, type} = this.props;
    const {opened} = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.title}>{title}</div>
            <div className={styles.id}>{id}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.type}>{type}</div>
            <i className={cx(styles.icon, 'nc-icon-mini', opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')}></i>
          </div>
        </div>
      </div>
    );
  }
}
