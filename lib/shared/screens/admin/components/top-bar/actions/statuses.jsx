import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './statuses.less';

export default class Statuses extends Component {
  static propTypes = {
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    behindVersion: PropTypes.bool.isRequired,
    draftHasChanges: PropTypes.bool.isRequired,
    drop: PropTypes.func.isRequired
  };

  render () {
    const {state, behindVersion, draftHasChanges} = this.props;
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

    return result;
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
        <div className={styles.root}>
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
        <div className={styles.root}>
          <span className={styles.text}>Editing your draft - </span>
          <button className={styles.button} onClick={drop}> Drop changes</button>
        </div>
      </Animate>
    );
  }

  renderPublished () {
    return (
      <Animate transition='slideDownIn' key='published'>
        <div className={styles.root}>
          <span className={styles.text}>Seeing published version</span>
        </div>
      </Animate>
    );
  }
}
