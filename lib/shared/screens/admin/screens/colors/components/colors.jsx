import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import Modal from 'components/modal';
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
    opened: PropTypes.bool.isRequired
  };

  render () {
    const {colors, search, searchChange, duplicateColor, removeColor, openNewColor} = this.props;

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
            removeColor={removeColor}
          />
        </Content>
        {this.renderNew()}
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
}
