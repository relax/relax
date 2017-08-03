import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class Statuses extends Component {
  static propTypes = {
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    behindVersion: PropTypes.bool,
    draftHasChanges: PropTypes.bool.isRequired,
    drop: PropTypes.func.isRequired,
    white: PropTypes.bool,
    big: PropTypes.bool
  };

  render () {
    const {state, behindVersion, draftHasChanges, white, big} = this.props;
    let result;

    if (state) {
      result = this.renderState();
    } else if (behindVersion) {
      result = this.renderBehind();
    } else if (draftHasChanges) {
      result = this.renderEditing();
    } else {
      result = this.renderPublished();
    }

    return (
      <div className={cx(styles.root, white && styles.white, big && styles.big)}>
        {result}
      </div>
    );
  }

  renderState () {
    const {state, stateMessage} = this.props;
    let result;

    if (state === 'loading') {
      result = (
        <Animate transition='slideDownIn' key='loading'>
          <div className={cx(styles.state, styles.loading)}>
            <Spinner small className={styles.spinner} />
            <span>{stateMessage}</span>
          </div>
        </Animate>
      );
    } else if (state === 'success') {
      result = (
        <Animate transition='slideDownIn' key='success'>
          <div className={cx(styles.state, styles.success)}>
            <i className='nc-icon-outline ui-1_check-small' />
            <span>{stateMessage}</span>
          </div>
        </Animate>
      );
    } else if (state === 'error') {
      result = (
        <Animate transition='slideDownIn' key='error'>
          <div className={cx(styles.state, styles.error)}>
            <i className='nc-icon-outline ui-2_small-remove' />
            <span>{stateMessage}</span>
          </div>
        </Animate>
      );
    }

    return result;
  }

  renderBehind () {
    return (
      <Animate transition='slideDownIn' key='behind'>
        <div>
          <span className={styles.text}>Your draft is behind current revision - </span>
          <button className={styles.button}> Fetch current</button>
        </div>
      </Animate>
    );
  }

  renderEditing () {
    const {drop} = this.props;
    return (
      <Animate transition='slideDownIn' key='editing'>
        <div>
          <span className={styles.text}>Editing your draft - </span>
          <button className={styles.button} onClick={drop}> Drop changes</button>
        </div>
      </Animate>
    );
  }

  renderPublished () {
    return (
      <Animate transition='slideDownIn' key='published'>
        <div>
          <span className={styles.text}>Seeing saved version</span>
        </div>
      </Animate>
    );
  }
}
