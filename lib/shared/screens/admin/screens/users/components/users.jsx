import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import Modal from 'components/modal';
import ModalDelete from 'components/modal-delete';
import React, {PropTypes} from 'react';

import List from './list';
import New from './new';

export default class Users extends Component {
  static fragments = List.fragments;

  static propTypes = {
    users: PropTypes.array.isRequired,
    openNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    closeNew: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleteConfirm: PropTypes.bool,
    deleteConfirmUser: PropTypes.object,
    cancelDelete: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    deletingUser: PropTypes.bool,
    search: PropTypes.string.isRequired,
    searchChange: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    displayChange: PropTypes.func.isRequired
  };

  render () {
    const {users, openNew, onDelete, search, searchChange, display, displayChange} = this.props;

    return (
      <div>
        <ContentHeader>
          <ContentSearch value={search} onChange={searchChange} />
          <ContentHeaderActions>
            <ContentDisplays display={display} onChange={displayChange} />
            <ContentNew onClick={openNew}>Add new user</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content noPadding={display === 'list'}>
          <List
            users={users}
            onDelete={onDelete}
            search={search}
            display={display}
          />
        </Content>
        {this.renderNew()}
        {this.renderDeleteConfirm()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New User' title='Make the introductions!' onClose={closeNew}>
          <New fragments={Users.fragments} onClose={closeNew} />
        </Modal>
      );
    }
  }

  renderDeleteConfirm () {
    const {deleteConfirm, deleteConfirmUser, cancelDelete, confirmDelete, deletingUser} = this.props;
    if (deleteConfirm) {
      return (
        <ModalDelete
          title={`Are you sure you want to remove the user "${deleteConfirmUser.name}"?`}
          cancel={cancelDelete}
          submit={confirmDelete}
          loading={deletingUser}
        />
      );
    }
  }
}
