import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render () {
    const {className} = this.props;
    return (
      <div className={cx(styles.spinner, className)}></div>
    );
  }
}
