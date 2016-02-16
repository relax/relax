import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';

import Tabs from './tabs';

@connect(
  (state) => ({
    menuTab: state.pageBuilder.menuTab
  })
)
export default class TabsContainer extends Component {
  render () {
    return (
      <Tabs {...this.props} />
    );
  }
}
