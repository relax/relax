import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './property.less';

export default class SchemaProperty extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  render () {
    const {title, id} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div>{title}</div>
            <div>{id}</div>
          </div>
        </div>
      </div>
    );
  }
}
