import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchFilter from 'components/list-search-filter';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import List from './list';

export default class Pages extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    pages: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    activePageId: PropTypes.string
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
        <ListSearchFilter />
        <Scrollable className={styles.list}>
          <List pages={pages} activePageId={activePageId} />
        </Scrollable>
      </div>
    );
  }
}
