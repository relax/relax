import cx from 'classnames';
import Component from 'components/component';
import ModalInput from 'components/modal-input';
import React, {PropTypes} from 'react';

import styles from './manage.less';

export default class Manage extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    tab: PropTypes.number.isRequired,
    changeTab: PropTypes.func.isRequired,
    fonts: PropTypes.object.isRequired,
    fontsActions: PropTypes.object.isRequired,
    closeManage: PropTypes.func.isRequired
  };

  changeTab (tab) {
    this.props.changeTab(tab);
  }

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
    const {tab} = this.props;
    return (
      <button
        className={cx(styles.tab, tab === index && styles.active)}
        onClick={this.changeTab.bind(this, index)}
        key={index}
      >
        {tabButton.title}
      </button>
    );
  }

  renderContent () {
    const {tab, tabs, fonts, fontsActions} = this.props;
    const currentTab = tabs[tab];
    let result;

    if (currentTab.lib !== 'custom') {
      const lib = currentTab.lib;
      const input = fonts.input[lib];

      result = (
        <div className={styles.inputArea}>
          <ModalInput
            invalid={!input.valid && input.input}
            value={input.input}
            onChange={fontsActions.changeFontInputAndUpdate.bind(this, tab)}
            placeholder={currentTab.placeholder}
          />
        </div>
      );
    } else {
      result = (
        <div>custom</div>
      );
    }

    return result;
  }
}
