import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ContentLoading extends Component {
  static propTypes = {
    above: PropTypes.bool,
    excludeHeader: PropTypes.bool
  };

  render () {
    const {above, excludeHeader} = this.props;
    return (
      <div className={cx(
          styles.root,
          above && styles.above,
          excludeHeader && styles.excludeHeader
        )}
      >
        <div className={styles.center}>
          <Animate>
            <Spinner />
          </Animate>
        </div>
      </div>
    );
  }
}
