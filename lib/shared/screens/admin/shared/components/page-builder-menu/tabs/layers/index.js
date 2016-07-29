import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Layers from './layers';

@connect(
  (state) => ({
    data: state.pageBuilder.data,
    selected: state.pageBuilder.selected,
    selectedElement: state.pageBuilder.selectedElement,
    elements: state.pageBuilder.elements,
    expanded: state.pageBuilder.expanded,
    userExpanded: state.pageBuilder.userExpanded,
    overedId: state.pageBuilder.overedId,
    dragging: state.dnd.dragging
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class LayersTabContainer extends Component {
  render () {
    return (
      <Layers
        {...this.props}
      />
    );
  }
}
