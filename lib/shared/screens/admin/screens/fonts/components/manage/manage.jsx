import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';

import CustomFonts from './custom';
import Provider from './provider';
import TabButton from './tab-button';
import styles from './manage.less';

export default class Manage extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    tab: PropTypes.number.isRequired,
    changeTab: PropTypes.func.isRequired,
    closeManage: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired
  };

  render () {
    const {tabs} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.tabs}>
          {tabs.map(this.renderTabButton, this)}
        </div>
        <div className={styles.content}>
          {this.renderContent()}
          {this.renderState()}
        </div>
      </div>
    );
  }

  renderState () {
    const {saving, closeManage} = this.props;
    let result;

    if (saving) {
      result = (
        <Animate key='saving'>
          <div className={styles.saving}>
            <Spinner />
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='submit'>
          <button className={styles.done} onClick={closeManage}>Done</button>
        </Animate>
      );
    }

    return result;
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
