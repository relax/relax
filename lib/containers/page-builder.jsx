import * as dndActions from '../client/actions/dnd';
import * as pageBuilderActions from '../client/actions/page-builder';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import elements from '../components/elements';
import PageBuilder from '../components/page-builder';

function getElementPath (selectedElement, data) {
  const result = [];
  let current = selectedElement;

  while (current.parent) {
    current = data[current.parent];
    result.unshift(current);
  }

  return result;
}

function inPath (elementId, targetId, data) {
  let found = false;
  let current = data[elementId];

  while (!found && current.parent) {
    if (current.parent === targetId) {
      found = true;
    }
    current = data[current.parent];
  }

  return found;
}

function getPageBuilder (pageBuilder, draft) {
  const data = draft.data.data;
  const result = {
    ...pageBuilder,
    data,
    elements,
    selectedPath: [],
    expanded: draft.expanded,
    userExpanded: draft.userExpanded
  };

  if (pageBuilder.linkingData) {
    // Check if inside the linking data holder
    if (pageBuilder.overedId && !inPath(pageBuilder.overedId, pageBuilder.linkingDataElementId, data)) {
      result.overedId = null;
    }
    if (pageBuilder.selectedId && !inPath(pageBuilder.selectedId, pageBuilder.linkingDataElementId, data)) {
      result.selectedId = null;
    }
  }

  if (pageBuilder.selectedId && result.selectedId) {
    const selectedElement = data[pageBuilder.selectedId];
    result.selectedElement = selectedElement;
    result.selectedParent = selectedElement && selectedElement.parent;
    result.selectedPath = selectedElement && getElementPath(selectedElement, data);
    result.selectedId = selectedElement && pageBuilder.selectedId;
  }

  if (pageBuilder.linkingDataElementId) {
    const linkingDataElement = data[pageBuilder.linkingDataElementId];
    result.linkingDataElement = linkingDataElement;
    result.linkingDataElementId = linkingDataElement && pageBuilder.linkingDataElementId;
  }

  return result;
}

@connect(
  (state) => ({
    pageBuilder: getPageBuilder(state.pageBuilder, state.draft),
    dnd: state.dnd,
    styles: state.styles.data,
    display: state.display
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    dndActions: bindActionCreators(dndActions, dispatch)
  })
)
export default class PageBuilderContainer extends Component {
  static fragments = {
    // draft: {
    //   actions: 1,
    //   data: 1,
    //   __v: 1
    // },
    styles: {
      _id: 1,
      title: 1,
      type: 1,
      options: 1
    }
  }

  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  render () {
    return (
      <PageBuilder
        {...this.props}
      />
    );
  }
}
