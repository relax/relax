import React from 'react';
import PropTypes from 'prop-types';
import Component from 'components/component';
import Permission from './permission';
import styles from './index.less';

export default class Permissions extends Component {
  static propTypes = {
    readable: PropTypes.bool.isRequired,
    writable: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render () {
    const {readable, writable, onChange} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <span>{'Permissions'}</span>
        </div>
        <Permission
          value={readable}
          index='publicReadable'
          iconNegative='ui-1_eye-ban-20'
          titleNegative='Non public readable'
          labelNegative='This means only admins can see this schema entries'
          iconPositive='ui-1_eye-19'
          titlePositive='Public readable'
          labelPositive='This means anyone can see this schema entries'
          onChange={onChange}
        />
        <Permission
          value={writable}
          index='publicWritable'
          iconNegative='ui-1_edit-77'
          titleNegative='Non public writable'
          labelNegative='This means only admins can create new entries to this schema'
          iconPositive='ui-1_edit-76'
          titlePositive='Public writable'
          labelPositive='This means anyone can create new entries to this schema'
          onChange={onChange}
        />
      </div>
    );
  }
}
