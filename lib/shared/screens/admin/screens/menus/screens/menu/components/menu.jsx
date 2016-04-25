import cx from 'classnames';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import EditableTitle from 'components/editable-title';
import ModalDelete from 'components/modal-delete';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relax-fragments';

import styles from './menu.less';
import MenuBuilder from './menu-builder';
import State from './state';

export default class Menu extends Component {
  static fragments = mergeFragments({
    menu: {
      _id: 1,
      title: 1
    }
  });

  static propTypes = {
    menu: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    cancelDelete: PropTypes.func.isRequired,
    deleteConfirm: PropTypes.bool.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    saveMenu: PropTypes.func.isRequired,
    state: PropTypes.string
  };

  render () {
    const {menu, onDelete, updateTitle} = this.props;

    return (
      <div className={cx(this.state.build && styles.build)}>
        <ContentHeader>
          <div className={styles.info}>
            <EditableTitle value={menu.title} onSubmit={updateTitle} />
          </div>
          <ContentHeaderActions>
            {this.renderState()}
            <button className={styles.actionButton} onClick={onDelete}>
              Delete Menu
            </button>
          </ContentHeaderActions>
        </ContentHeader>
        <div className={styles.content}>
          <MenuBuilder />
        </div>
        {this.renderDeleteConfirm()}
      </div>
    );
  }

  renderState () {
    const {saveMenu, state} = this.props;
    return <State saveMenu={saveMenu} state={state} />;
  }

  renderDeleteConfirm () {
    const {deleteConfirm, cancelDelete, confirmDelete, menu} = this.props;
    if (deleteConfirm) {
      return (
        <ModalDelete
          title={`Are you sure you want to remove "${menu.title}" menu?`}
          cancel={cancelDelete}
          submit={confirmDelete}
        />
      );
    }
  }
}
