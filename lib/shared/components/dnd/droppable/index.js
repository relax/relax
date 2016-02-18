import * as dndActions from 'actions/dnd';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {openElementsMenu} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Droppable from './droppable';

@connect(
  (state, props) => ({
    elementsMenuSpot: state.pageBuilder.elementsMenuSpot,
    selectedId: state.pageBuilder.selectedId,
    dragging: state.dnd.dragging,
    activeDropInfo: state.dnd.dropInfo,
    activeDragInfo: state.dnd.dragInfo,
    draggingData: state.dnd.draggingData,
    showMarks: state.pageBuilder.editing &&
              !state.pageBuilder.linkingData &&
              (state.pageBuilder.selectedParent === props.dropInfo.id || (state.pageBuilder.selectedId === props.dropInfo.id)),
    isActive: state.dnd.dragging && state.dnd.dropInfo.id === props.dropInfo.id
  }),
  (dispatch) => ({
    dndActions: bindActionCreators(dndActions, dispatch),
    ...bindActionCreators({openElementsMenu}, dispatch)
  })
)
export default class DroppableContainer extends Component {
  static propTypes = {
    dropInfo: PropTypes.object.isRequired
  };

  render () {
    return <Droppable {...this.props}/>;
  }
}
