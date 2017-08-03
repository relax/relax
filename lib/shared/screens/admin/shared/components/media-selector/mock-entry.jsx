import cx from 'classnames';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';

import mockStyles from './mock-entry.less';
import styles from './entry.less';

export default class MediaMockEntry extends Component {
  static propTypes = {
    upload: PropTypes.object.isRequired
  };

  render () {
    const {upload} = this.props;
    let result;

    if (upload.status === 'queue') {
      result = <i className='nc-icon-mini ui-2_hourglass'></i>;
    } else if (upload.status === 'uploading') {
      result = <Spinner />;
    }

    return (
      <div className={cx(styles.entry, mockStyles.root)}>
        <div className={cx(styles.preview, mockStyles.preview)}>
          {result}
        </div>
        <div className={styles.info}></div>
      </div>
    );
  }
}
