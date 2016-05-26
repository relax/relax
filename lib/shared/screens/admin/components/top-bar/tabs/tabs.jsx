import Component from 'components/component';
import Modal from 'components/modal';
import New from 'components/new-page';
import React, {PropTypes} from 'react';

import styles from './tabs.less';
import Tab from './tab';

export default class Tabs extends Component {
  static fragments = {
    tabs: Tab.fragments.tab
  };

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    removeTab: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    openNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired
  };

  render () {
    const {openNew} = this.props;
    return (
      <div className={styles.root}>
        {this.props.tabs.map(this.renderTab, this)}
        <button className={styles.addButton} key='add' onClick={openNew}>
          <i className='nc-icon-mini ui-1_bold-add'></i>
        </button>
        {this.renderNew()}
      </div>
    );
  }

  renderTab (tab, key) {
    const {removeTab, pathname} = this.props;
    return (
      <Tab
        tab={tab}
        tabsCount={this.props.tabs.length}
        removeTab={removeTab}
        pathname={pathname}
        key={key}
      />
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New Page' title='What should we call it?' onClose={closeNew}>
          <New onClose={closeNew} redirectBuild />
        </Modal>
      );
    }
  }
}
