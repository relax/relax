import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './manage.less';
import CustomFonts from './custom';
import Provider from './provider';
import TabButton from './tab-button';

export default class Manage extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    tab: PropTypes.number.isRequired,
    changeTab: PropTypes.func.isRequired,
    fonts: PropTypes.object.isRequired,
    fontsActions: PropTypes.object.isRequired,
    closeManage: PropTypes.func.isRequired
  };

  render () {
    const {tabs, closeManage} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.tabs}>
          {tabs.map(this.renderTabButton, this)}
        </div>
        <div className={styles.content}>
          {this.renderContent()}
          <button className={styles.done} onClick={closeManage}>Done</button>
        </div>
      </div>
    );
  }

  renderTabButton (tabButton, index) {
    const {tab, changeTab} = this.props;
    return (
      <TabButton
        id={index}
        title={tabButton.title}
        onClick={changeTab}
        active={tab === index}
        key={index}
      />
    );
  }

  renderContent () {
    const {tab, tabs} = this.props;
    const currentTab = tabs[tab];
    let result;

    if (currentTab.lib !== 'custom') {
      result = (
        <Provider lib={currentTab.lib} placeholder={currentTab.placeholder} />
      );
    } else {
      result = (
        <CustomFonts />
      );
    }

    return result;
  }
}
