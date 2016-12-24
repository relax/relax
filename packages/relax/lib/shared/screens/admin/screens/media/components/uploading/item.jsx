import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './item.less';

export default class UploadItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  };

  render () {
    const {name} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.name}>{name}</div>
        {this.renderStatus()}
      </div>
    );
  }

  renderStatus () {
    const {status} = this.props;
    let result;

    if (status === 'queue') {
      result = <i className='nc-icon-mini ui-2_hourglass'></i>;
    } else if (status === 'uploading') {
      result = <Spinner />;
    } else if (status === 'success') {
      result = <i className='nc-icon-mini ui-1_check'></i>;
    } else if (status === 'error') {
      result = <i className='nc-icon-mini ui-1_simple-remove'></i>;
    }

    return (
      <Animate key={status}>
        <div className={cx(styles.status, styles[status])}>
          {result}
        </div>
      </Animate>
    );
  }
}
