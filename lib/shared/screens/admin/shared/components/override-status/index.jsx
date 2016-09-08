import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class OptionOverrides extends Component {
  static propTypes = {
    elementOverride: PropTypes.bool,
    displayOverride: PropTypes.bool
  };

  render () {
    const {displayOverride, elementOverride} = this.props;

    return (
      <div className={styles.root}>
        {
          displayOverride &&
          <div className={styles.display} />
        }
        {
          elementOverride &&
          <div className={cx(styles.element, displayOverride && styles.elementDisplay)} />
        }
      </div>
    );
  }
}
