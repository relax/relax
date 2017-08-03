import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './actions.less';

export default class Actions extends Component {
  static propTypes = {
    draftHasChanges: PropTypes.bool.isRequired,
    isPublished: PropTypes.bool.isRequired,
    openDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const {draftHasChanges} = this.props;
    let result;

    if (draftHasChanges) {
      result = (
        <Animate key='changes'>
          <div className={styles.table}>
            {this.renderDraftState()}
            {this.renderPush()}
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='none'>
          <div className={styles.none}>
            No changes to publish
          </div>
        </Animate>
      );
    }

    return result;
  }

  renderPush () {
    const {isPublished, openPushChangesConfirmation} = this.props;
    const label = isPublished ? 'Publish Changes' : 'Publish';

    return (
      <div className={styles.part}>
        <Button primary noBackground bordered smallFont full onClick={openPushChangesConfirmation}>
          {label}
        </Button>
      </div>
    );
  }

  renderDraftState () {
    const {openDropDraftConfirmation} = this.props;

    return (
      <div className={styles.part}>
        <Button noBackground smallFont grey full onClick={openDropDraftConfirmation}>
          Drop draft
        </Button>
      </div>
    );
  }
}
