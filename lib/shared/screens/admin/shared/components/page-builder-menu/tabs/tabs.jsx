import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './tabs.less';
import Layers from './layers';
import Settings from './settings';
import Style from './style';
import TabButton from './tab-button';

export default class Tabs extends Component {
  static propTypes = {
    menuTab: PropTypes.string.isRequired,
    setMenuTab: PropTypes.func.isRequired
  };

  render () {
    const {menuTab} = this.props;
    return (
      <div>
        <div className={styles.tabs}>
          <TabButton tab='style' active={menuTab === 'style'} onClick={this.props.setMenuTab} />
          <TabButton tab='settings' active={menuTab === 'settings'} onClick={this.props.setMenuTab} />
          <TabButton tab='layers' active={menuTab === 'layers'} onClick={this.props.setMenuTab} />
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
    }

    return result;
  }
}
