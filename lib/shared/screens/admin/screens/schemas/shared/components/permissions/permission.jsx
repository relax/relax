import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import styles from './permission.less';

export default class Permission extends Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    index: PropTypes.string.isRequired,
    iconNegative: PropTypes.string.isRequired,
    titleNegative: PropTypes.string.isRequired,
    labelNegative: PropTypes.string.isRequired,
    iconPositive: PropTypes.string.isRequired,
    titlePositive: PropTypes.string.isRequired,
    labelPositive: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onNegative () {
    const {onChange, index} = this.props;
    onChange(index, false);
  }

  @bind
  onPositive () {
    const {onChange, index} = this.props;
    onChange(index, true);
  }

  render () {
    const {
      value,
      iconNegative,
      titleNegative,
      labelNegative,
      iconPositive,
      titlePositive,
      labelPositive
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={cx(styles.option, !value && styles.active)} onClick={this.onNegative}>
          <div className={styles.column}>
            <i className={cx(styles.icon, 'nc-icon-outline', iconNegative)} />
          </div>
          <div className={styles.column}>
            <div className={styles.title}>{titleNegative}</div>
            <div className={styles.label}>{labelNegative}</div>
          </div>
        </div>
        <div className={cx(styles.option, value && styles.active)} onClick={this.onPositive}>
          <div className={styles.column}>
            <i className={cx(styles.icon, 'nc-icon-outline', iconPositive)} />
          </div>
          <div className={styles.column}>
            <div className={styles.title}>{titlePositive}</div>
            <div className={styles.label}>{labelPositive}</div>
          </div>
        </div>
      </div>
    );
  }
}
