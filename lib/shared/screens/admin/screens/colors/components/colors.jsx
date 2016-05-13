import find from 'lodash.find';
import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import Modal from 'components/modal';
import ModalDelete from 'components/modal-delete';
import React, {PropTypes} from 'react';

import List from './list';
import New from './new';

export default class Colors extends Component {
  static fragments = List.fragments;

  static propTypes = {
    colors: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    searchChange: PropTypes.func.isRequired,
    duplicateColor: PropTypes.func.isRequired,
    removeColor: PropTypes.func.isRequired,
    openNewColor: PropTypes.func.isRequired,
    closeNewColor: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
    openRemoveColor: PropTypes.func.isRequired,
    closeRemoveColor: PropTypes.func.isRequired,
    removeOpened: PropTypes.bool.isRequired,
    removeId: PropTypes.string
  };

  render () {
    const {colors, search, searchChange, duplicateColor, openRemoveColor, openNewColor} = this.props;

    return (
      <div>
        <ContentHeader>
          <ContentSearch value={search} onChange={searchChange} />
          <ContentHeaderActions>
            <ContentNew onClick={openNewColor}>Add new color</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List
            colors={colors}
            search={search}
            duplicateColor={duplicateColor}
            removeColor={openRemoveColor}
          />
        </Content>
        {this.renderNew()}
        {this.renderDeleteConfirm()}
      </div>
    );
  }

  renderNew () {
    const {opened} = this.props;

    if (opened) {
      const {closeNewColor} = this.props;
      return (
        <Modal small subTitle='New Color' title='Adding new color to palette' onClose={closeNewColor}>
          <New onClose={closeNewColor} />
        </Modal>
      );
    }
  }

  renderDeleteConfirm () {
    const {removeOpened, removeId} = this.props;
    if (removeOpened && removeId) {
      const {closeRemoveColor, removeColor, colors} = this.props;
      const color = find(colors, {_id: removeId});

      if (color) {
        return (
          <ModalDelete
            title={`Are you sure you want to remove "${color.label}" color?`}
            cancel={closeRemoveColor}
            submit={removeColor}
          />
        );
      }
    }
  }
}
