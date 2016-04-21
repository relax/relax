import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './item.less';

export default class InfoItem extends Component {
  static propTypes = {
    icon: PropTypes.string,
    image: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  render () {
    const {icon, label, value, image} = this.props;
    return (
      <div className={styles.root}>
        <div>
          {icon && <i className={cx(styles.icon, icon)}></i>}
          {image && <img className={styles.image} src={image} role='presentation' />}
          <span className={styles.infoLabel}>
            {label}
          </span>
        </div>
        <div className={styles.infoValue}>
          {value}
        </div>
      </div>
    );
  }
}
