import Component from 'components/component';
import React from 'react';
import {setMenuTab} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Tabs from './tabs';

@connect(
  (state) => ({
    menuTab: state.pageBuilder.menuTab
  }),
  (dispatch) => bindActionCreators({setMenuTab}, dispatch)
)
export default class TabsContainer extends Component {
  render () {
    return (
      <Tabs {...this.props} />
    );
  }
}
