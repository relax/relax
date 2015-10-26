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

function getPageBuilder (pageBuilder, data) {
  const result = {
    ...pageBuilder,
    data,
    elements,
    selectedPath: []
  };

  if (pageBuilder.selectedId && data[pageBuilder.selectedId]) {
    const selectedElement = data[pageBuilder.selectedId];
    result.selectedElement = selectedElement;
    result.selectedParent = selectedElement && selectedElement.parent;
    result.selectedPath = selectedElement && getElementPath(selectedElement, data);
  }

  return result;
}

@connect(
  (state) => ({
    pageBuilder: getPageBuilder(state.pageBuilder, state.draft.data.data),
    dnd: state.dnd
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    dndActions: bindActionCreators(dndActions, dispatch)
  })
)
export default class PageBuilderContainer extends Component {
  static fragments = {
    draft: {
      actions: 1,
      data: 1,
      __v: 1
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
