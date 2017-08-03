import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentNew from 'components/content-new';
import ContentNotFound from 'components/content-not-found';
import EditableTitle from 'components/editable-title';
import MenuBuilder from './menu-builder';
import ModalDelete from 'components/modal-delete';
import State from './state';
import cx from 'classnames';
import {mergeFragments} from 'relax-fragments';
import styles from './menu.less';

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
    state: PropTypes.string,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {loading, menu} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!menu) {
      result = this.renderNotFound();
    } else {
      result = this.renderContent();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderNotFound () {
    return (
      <ContentNotFound name='menu' />
    );
  }

  renderContent () {
    const {menu, onDelete, updateTitle} = this.props;

    return (
      <div className={cx(this.state.build && styles.build)}>
        <ContentHeader>
          <div className={styles.info}>
            <EditableTitle value={menu.title} onSubmit={updateTitle} />
          </div>
          <ContentHeaderActions>
            {this.renderState()}
            <ContentNew remove onClick={onDelete}>
              Delete Menu
            </ContentNew>
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
