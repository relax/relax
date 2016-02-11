import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchFilter from 'components/list-search-filter';
import Menu from 'components/menu';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './pages.less';
import List from './list';

export default class Pages extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    pages: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
    onOpenList: PropTypes.func.isRequired
  };

  render () {
    const {pages, onBack, onOpenList, onNew, opened} = this.props;

    return (
      <div>
        <Menu active='Pages' opened={opened} onOpen={onOpenList}>
          <ListHeader
            title='Pages'
            onBack={onBack}
            newIcon='nc-icon-outline ui-2_window-add'
            onNew={onNew}
          />
          <ListSearchFilter />
          <Scrollable className={styles.list}>
            <List pages={pages} />
          </Scrollable>
        </Menu>
        <div className={styles.holder}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    let result;

    if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }

    return result;
  }

  renderEmpty () {
    return (
      <div className={styles.empty}>
        <i className='nc-icon-outline design_window-paragraph'></i>
        <div className={styles.emptyText}>Relax, select a page first!</div>
      </div>
    );
  }
}
