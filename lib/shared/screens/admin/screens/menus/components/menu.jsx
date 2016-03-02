import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import List from './list';
import New from './new';

export default class Menu extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    menus: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    onNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    activeId: PropTypes.string
  };

  render () {
    const {menus, onBack, onNew, activeId} = this.props;

    return (
      <div>
        <ListHeader
          title='Menus'
          onBack={onBack}
          newIcon='nc-icon-outline ui-1_circle-add'
          onNew={onNew}
        />
        <ListSearchSort />
        <Scrollable className={styles.list}>
          <List menus={menus} activeId={activeId} />
        </Scrollable>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New Menu' title='What should we call it?' onClose={closeNew}>
          <New onClose={closeNew} />
        </Modal>
      );
    }
  }
}
