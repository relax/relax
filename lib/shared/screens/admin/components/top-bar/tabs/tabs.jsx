import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './tabs.less';
import Tab from './tab';

export default class Tabs extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  };

  static defaultProps = {
    tabs: []
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
    return (
      <Tab
        tab={tab}
        tabsCount={this.props.tabs.length}
        key={key}
      />
    );
  }
}
