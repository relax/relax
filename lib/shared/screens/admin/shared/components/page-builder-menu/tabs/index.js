import Component from 'components/component';
import React, {PropTypes} from 'react';
import {setMenuTab} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Tabs from './tabs';

@connect(
  (state) => ({
    menuTab: state.pageBuilder.menuTab,
    type: state.pageBuilder.type,
    dataLinkable:
      (state.pageBuilder.type === 'template' ||
      state.pageBuilder.linkingData ||
      ( // linkable selected element
        state.pageBuilder.selectedElement &&
        state.pageBuilder.elements[state.pageBuilder.selectedElement.tag].settings.dynamicLinkable
      )) && true
  }),
  (dispatch) => bindActionCreators({setMenuTab}, dispatch)
)
export default class TabsContainer extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  render () {
    return (
      <Tabs
        {...this.props}
      />
    );
  }
}
