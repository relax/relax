import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import List from './list';
import New from './new';

const sorts = [
  {
    label: 'Date desc',
    property: '_id',
    order: 'desc'
  },
  {
    label: 'Date asc',
    property: '_id',
    order: 'asc'
  },
  {
    label: 'Title A-Z',
    property: 'title',
    order: 'asc'
  },
  {
    label: 'Title Z-A',
    property: 'title',
    order: 'desc'
  },
  {
    label: 'Updated desc',
    property: 'updatedDate',
    order: 'desc'
  },
  {
    label: 'Updated asc',
    property: 'updatedDate',
    order: 'asc'
  }
];

export default class PagesMenu extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    pages: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    activePageId: PropTypes.string,
    newOpened: PropTypes.bool.isRequired
  };

  render () {
    const {pages, onBack, onNew, activePageId} = this.props;

    return (
      <div>
        <ListHeader
          title='Pages'
          onBack={onBack}
          newIcon='nc-icon-outline ui-2_window-add'
          onNew={onNew}
        />
      <ListSearchSort sorts={sorts} />
        <Scrollable className={styles.list}>
          <List pages={pages} activePageId={activePageId} />
        </Scrollable>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New Page' title='What should we call it?' onClose={closeNew}>
          <New fragments={PagesMenu.fragments} onClose={closeNew} />
        </Modal>
      );
    }
  }
}
