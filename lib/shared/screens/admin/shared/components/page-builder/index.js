import * as dndActions from 'actions/dnd';
import * as pageBuilderActions from 'actions/page-builder';

import dataConnect from 'decorators/data-connector';
import elements from 'elements';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updateColors} from 'helpers/colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageBuilder from './page-builder.jsx';

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

  if (pageBuilder.focusElementId) {
    // Check if inside the linking data holder
    if (pageBuilder.overedId && !inPath(pageBuilder.overedId, pageBuilder.focusElementId, data)) {
      result.overedId = null;
    }
    if (pageBuilder.selectedId && !inPath(pageBuilder.selectedId, pageBuilder.focusElementId, data)) {
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

@dataConnect()
@connect(
  (state) => ({
    params: state.router.params,
    pageBuilder: getPageBuilder(state.pageBuilder, state.draft),
    dnd: state.dnd,
    styles: state.styles.data,
    display: state.display,
    symbols: state.symbols,
    colors: state.colors.data
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    dndActions: bindActionCreators(dndActions, dispatch)
  })
)
export default class PageBuilderContainer extends Component {
  static fragments = {
    draft: {
      _id: {
        _id: 1,
        _userId: 1
      },
      __v: 1,
      data: 1,
      actions: 1
    },
    colors: {
      _id: 1,
      label: 1,
      value: 1
    },
    styles: {
      _id: 1,
      title: 1,
      type: 1,
      options: 1
    }
  };

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired
  };

  getInitState () {
    updateColors(this.props.colors);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.colors !== nextProps.colors) {
      updateColors(nextProps.colors);
    }
  }

  initialize () {
    this.props.fetchData({
      fragments: PageBuilderContainer.fragments,
      variables: {
        draft: {
          id: {
            value: this.props.params.id,
            type: 'ID!'
          }
        }
      }
    });
  }

  render () {
    return (
      <PageBuilder {...this.props} />
    );
  }
}
