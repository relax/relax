import * as dndActions from 'actions/dnd';

import isElementSelected from 'helpers/is-element-selected';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {openElementsMenu} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Droppable from './droppable';

@connect(
  (state, props) => {
    const {pageBuilder, dnd, router} = state;
    const {dropInfo} = props;

    // is element selected
    const isSelected = isElementSelected(pageBuilder.selected, dropInfo);

    // show add element marks
    const canShowMarks =
      props.showMarks !== false &&
      router.location.query.build &&
      pageBuilder.editing &&
      !pageBuilder.linkingData;

    const isSelectedParent =
      pageBuilder.selected &&
      isElementSelected(pageBuilder.selectedParent, dropInfo);

    const inScope =
      dropInfo.id === 'body' ||
      isSelected ||
      (
        isSelectedParent &&
        (
          !pageBuilder.selectedElement.children ||
          pageBuilder.selectedElement.children.constructor !== Array ||
          pageBuilder.selectedElement.children.length === 0
        )
      );


    return {
      elementsMenuSpot: pageBuilder.elementsMenuSpot,
      selected: pageBuilder.selected,
      dragging: dnd.dragging,
      activeDropInfo: dnd.dropInfo,
      activeDragInfo: dnd.dragInfo,
      draggingData: dnd.draggingData,
      showMarks: canShowMarks && inScope,
      isSelected,
      isActive:
        dnd.dragging &&
        dnd.dropInfo.id === props.dropInfo.id &&
        dnd.dropInfo.context === props.dropInfo.context
    };
  },
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
    return <Droppable {...this.props} />;
  }
}
