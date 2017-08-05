import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string,
    small: PropTypes.bool
  };

  render () {
    const {className, small} = this.props;
    return (
      <div className={cx(styles.spinner, small && styles.small, className)}></div>
    );
  }
}
