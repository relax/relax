import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {setMenuTab} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import elements from 'elements';

import Tabs from './tabs';

@connect(
  (state) => ({
    menuTab: state.pageBuilder.menuTab,
    type: state.pageBuilder.type,
    dataLinkable:
      !!(state.pageBuilder.type === 'template' ||
      state.pageBuilder.linkingData ||
      ( // linkable selected element
        state.pageBuilder.selectedElement &&
        elements[state.pageBuilder.selectedElement.tag].settings.dynamicLinkable
      ))
  }),
  (dispatch) => bindActionCreators({setMenuTab}, dispatch)
)
export default class TabsContainer extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  render () {
    return (
      <Tabs
        {...this.props}
      />
    );
  }
}
