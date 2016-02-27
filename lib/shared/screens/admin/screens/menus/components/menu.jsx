import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchSort from 'components/list-search-sort';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import List from './list';

export default class Menu extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    menus: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
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
      </div>
    );
  }
}
