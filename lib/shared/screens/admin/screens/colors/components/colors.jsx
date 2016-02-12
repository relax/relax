import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './colors.less';

export default class Colors extends Component {
  static fragments = {
    colors: {
      _id: 1,
      label: 1
    }
  };

  static propTypes = {
    colors: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className={styles.holder}>
        Colors
      </div>
    );
  }
}
