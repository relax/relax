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

  if (pageBuilder.selectedId && data[pageBuilder.selectedId]) {
    const selectedElement = data[pageBuilder.selectedId];
    result.selectedElement = selectedElement;
    result.selectedParent = selectedElement && selectedElement.parent;
    result.selectedPath = selectedElement && getElementPath(selectedElement, data);
    pageBuilder.selectedId = selectedElement && pageBuilder.selectedId;
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
