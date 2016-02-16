import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './tabs.less';
import TabButton from './tab-button';

export default class Tabs extends Component {
  static propTypes = {
    menuTab: PropTypes.string.isRequired
  };

  render () {
    const {menuTab} = this.props;
    return (
      <div>
        <div className={styles.tabs}>
          <TabButton tab='style' active={menuTab === 'style'} />
          <TabButton tab='settings' active={menuTab === 'settings'} />
          <TabButton tab='layers' active={menuTab === 'layers'} />
        </div>
      </div>
    );
  }
}
