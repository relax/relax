import Component from 'components/component';
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
    pathname: PropTypes.string.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.props.tabs.map(this.renderTab, this)}
        <button className={styles.addButton} key='add'>
          <i className='nc-icon-mini ui-1_bold-add'></i>
        </button>
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
}
