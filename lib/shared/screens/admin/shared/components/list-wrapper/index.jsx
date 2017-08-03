import Animate from 'components/animate';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './index.less';

export default class List extends Component {
  static propTypes = {
    loadMore: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    className: PropTypes.string
  };

  render () {
    const {loadMore, className} = this.props;

    return (
      <div className={cx(styles.root, className)}>
        <Scrollable className={styles.scrollArea} lazyLoad loadMore={loadMore}>
          {this.props.children}
          {this.renderLoadingMore()}
        </Scrollable>
        {this.renderLoading()}
      </div>
    );
  }

  renderLoading () {
    const {loading, loadingMore} = this.props;

    if (loading && !loadingMore) {
      return (
        <Animate transition='fadeIn'>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}>
              <Spinner />
            </div>
          </div>
        </Animate>
      );
    }
  }

  renderLoadingMore () {
    const {loadingMore} = this.props;
    if (loadingMore) {
      return (
        <div className={styles.loadingMore} key='loadingMore'>
          <Spinner small />
        </div>
      );
    }
  }
}
