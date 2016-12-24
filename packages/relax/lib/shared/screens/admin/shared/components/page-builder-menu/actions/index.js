import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {openDropDraftConfirmation, openPushChangesConfirmation} from 'actions/page-builder';

import Actions from './actions';

@connect(
  (state) => ({
    draftHasChanges: state.pageBuilder.actions.length > 0 || state.pageBuilder.restored,
    isPublished: !!(state.pageBuilder.doc && state.pageBuilder.doc.status === 'published')
  }),
  (dispatch) => bindActionCreators({
    openDropDraftConfirmation,
    openPushChangesConfirmation
  }, dispatch)
)
export default class ActionsContainer extends Component {
  static propTypes = {
    openDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired,
    draftHasChanges: PropTypes.bool.isRequired,
    isPublished: PropTypes.bool.isRequired
  };

  render () {
    const {draftHasChanges, isPublished} = this.props;

    return (
      <Actions
        draftHasChanges={draftHasChanges}
        isPublished={isPublished}
        openDropDraftConfirmation={this.props.openDropDraftConfirmation}
        openPushChangesConfirmation={this.props.openPushChangesConfirmation}
      />
    );
  }
}
