import * as pageBuilderActions from 'actions/page-builder';
import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import SaveStatus from './save-status';

@connect(
  (state) => ({
    draftID: state.pageBuilder.id,
    draftActionsNumb: state.pageBuilder.fragments.draft.actions.length,
    confirmDropDraft: state.pageBuilder.dropDraftConfirmation,
    confirmPublish: state.pageBuilder.pushChangesConfirmation,
    loading: state.pageBuilder.state === 'loading'
  }),
  (dispatch) => bindActionCreators(pageBuilderActions, dispatch)
)
export default class SaveStatusContainer extends Component {
  static propTypes = {
    autosave: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    openDropDraftConfirmation: PropTypes.func.isRequired,
    closeDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired,
    closePushChangesConfirmation: PropTypes.func.isRequired,
    draftActionsNumb: PropTypes.number.isRequired,
    draftID: PropTypes.string,
    confirmDropDraft: PropTypes.bool.isRequired,
    confirmPublish: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount () {
    window.addEventListener('beforeunload', this.preventNavigation);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.draftActionsNumb !== this.props.draftActionsNumb &&
        nextProps.draftID === this.props.draftID) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(this.saveDraft, 2000);
    }
  }

  componentWillUnmount () {
    this.saveDraft();
    window.removeEventListener('beforeunload', this.preventNavigation);
  }

  @bind
  preventNavigation (event) {
    if (this.saveTimeout) {
      const confirmationMessage = 'Your draft has not been saved yet!';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  @bind
  saveDraft () {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
      this.props.autosave();
    }
  }

  @bind
  clearAutoSave () {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
    }
  }

  @bind
  drop () {
    this.clearAutoSave();
    this.props.drop();
  }

  @bind
  save () {
    this.clearAutoSave();
    this.props.save();
  }

  render () {
    const {
      confirmDropDraft,
      confirmPublish,
      openDropDraftConfirmation,
      closeDropDraftConfirmation,
      openPushChangesConfirmation,
      closePushChangesConfirmation,
      loading
    } = this.props;

    return (
      <SaveStatus
        confirmDropDraft={confirmDropDraft}
        confirmPublish={confirmPublish}
        openDropDraftConfirmation={openDropDraftConfirmation}
        closeDropDraftConfirmation={closeDropDraftConfirmation}
        openPushChangesConfirmation={openPushChangesConfirmation}
        closePushChangesConfirmation={closePushChangesConfirmation}
        loading={loading}
        drop={this.drop}
        save={this.save}
      />
    );
  }
}
