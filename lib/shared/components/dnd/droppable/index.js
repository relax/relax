import * as dndActions from 'actions/dnd';
import Component from 'components/component';
import isElementSelected from 'helpers/page-builder/is-element-selected';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {openElementsMenu} from 'actions/page-builder';

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
      dropInfo.id === 'Body' ||
      isSelected ||
      (
        isSelectedParent &&
        (
          !pageBuilder.selectedElement.children ||
          pageBuilder.selectedElement.children.constructor !== Array ||
          pageBuilder.selectedElement.children.length === 0
        )
      );

    // is active (is dragging something here)
    let isActive = dnd.dragging && dnd.dropInfo.id === props.dropInfo.id;

    if (props.dropInfo.context && dnd.dropInfo.context) {
      if (typeof props.dropInfo.context === 'string' || typeof dnd.dropInfo.context === 'string') {
        isActive = isActive && dnd.dropInfo.context === props.dropInfo.context;
      } else {
        // compound context
        isActive =
          isActive &&
          dnd.dropInfo.context.doc === props.dropInfo.context.doc &&
          dnd.dropInfo.context.property === props.dropInfo.context.property;
      }
    }


    return {
      elementsMenuSpot: pageBuilder.elementsMenuSpot,
      selected: pageBuilder.selected,
      dragging: dnd.dragging,
      activeDropInfo: dnd.dropInfo,
      activeDragInfo: dnd.dragInfo,
      draggingData: dnd.draggingData,
      showMarks: canShowMarks && inScope,
      isSelected,
      isActive
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
