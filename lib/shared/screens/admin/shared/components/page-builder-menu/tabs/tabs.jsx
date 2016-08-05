import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './tabs.less';
import Layers from './layers';
import Link from './link';
import Settings from './settings';
import Style from './style';
import TabButton from './tab-button';

export default class Tabs extends Component {
  static propTypes = {
    menuTab: PropTypes.string.isRequired,
    setMenuTab: PropTypes.func.isRequired,
    dataLinkable: PropTypes.bool.isRequired
  };

  render () {
    const {menuTab, dataLinkable, setMenuTab} = this.props;

    return (
      <div>
        <div className={styles.tabs}>
          <TabButton
            tab='style'
            icon='nc-icon-outline design_brush'
            active={menuTab === 'style'}
            dataLinkable={dataLinkable}
            onClick={setMenuTab}
          />
          <TabButton
            tab='settings'
            icon='nc-icon-outline ui-2_settings-90'
            active={menuTab === 'settings'}
            dataLinkable={dataLinkable}
            onClick={setMenuTab}
          />
          <TabButton
            tab='layers'
            icon='nc-icon-outline ui-2_menu-bold'
            active={menuTab === 'layers'}
            dataLinkable={dataLinkable}
            onClick={setMenuTab}
          />
          <TabButton
            tab='link'
            icon='nc-icon-outline ui-2_share-bold'
            active={menuTab === 'link'}
            dataLinkable={dataLinkable}
            onClick={setMenuTab}
          />
        </div>
        <div className={styles.content}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    const {menuTab} = this.props;
    let result;

    if (menuTab === 'style') {
      result = <Style />;
    } else if (menuTab === 'settings') {
      result = <Settings />;
    } else if (menuTab === 'layers') {
      result = <Layers />;
    } else if (menuTab === 'link') {
      result = <Link />;
    }

    return result;
  }
}
