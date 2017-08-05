import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './empty.less';

export default class Empty extends Component {
  static propTypes = {
    isActive: PropTypes.bool
  };

  render () {
    const {isActive} = this.props;

    return (
      <div className={cx(styles.root, isActive && styles.active)} />
    );
  }
}
