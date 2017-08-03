import Component from 'components/component';
import ModalDelete from 'components/modal-delete';
import React from 'react';
import PropTypes from 'prop-types';

export default class SaveStatus extends Component {
  static propTypes = {
    drop: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    confirmPublish: PropTypes.bool.isRequired,
    confirmDropDraft: PropTypes.bool.isRequired,
    openDropDraftConfirmation: PropTypes.func.isRequired,
    closeDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired,
    closePushChangesConfirmation: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div>
        {this.renderPublishConfirm()}
        {this.renderDropConfirm()}
      </div>
    );
  }

  renderPublishConfirm () {
    const {confirmPublish, save, closePushChangesConfirmation, loading} = this.props;

    if (confirmPublish) {
      return (
        <ModalDelete
          cancelLabel='Cancel'
          deleteLabel='Publish'
          title='Are you sure?'
          subTitle='You are about to publish your changes which will make it available to the public'
          cancel={closePushChangesConfirmation}
          submit={save}
          loading={loading}
        />
      );
    }
  }

  renderDropConfirm () {
    const {confirmDropDraft, drop, closeDropDraftConfirmation, loading} = this.props;

    if (confirmDropDraft) {
      return (
        <ModalDelete
          cancelLabel='Cancel'
          deleteLabel='Drop it'
          title='Are you sure?'
          subTitle='You are about to discard your changes, this has no revert'
          cancel={closeDropDraftConfirmation}
          submit={drop}
          loading={loading}
        />
      );
    }
  }
}
