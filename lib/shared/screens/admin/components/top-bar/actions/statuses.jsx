import Animate from 'components/animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './statuses.less';

export default class Statuses extends Component {
  static propTypes = {
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    behindVersion: PropTypes.bool.isRequired,
    draftHasChanges: PropTypes.bool.isRequired
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
    return (<div></div>);
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
    return (
      <Animate transition='slideDownIn' key='editing'>
        <div className={styles.root}>
          <span className={styles.text}>Editing your draft - </span>
          <button className={styles.button}> Drop changes</button>
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
