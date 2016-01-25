import forEach from 'lodash.foreach';

import actionTypes from './types';
import request from '../helpers/request';
import stringifyFields from '../helpers/stringify-fields';

export function toggleEditing () {
  return {
    type: actionTypes.pbToggleEditing
  };
}

export function setMenuOpened (value) {
  return {
    type: actionTypes.pbSetMenuOpened,
    value
  };
}

export function setMenuSide (value) {
  return {
    type: actionTypes.pbSetMenuSide,
    value
  };
}

export function setMenuTab (value) {
  return {
    type: actionTypes.pbSetMenuTab,
    value
  };
}

export function openElementsMenu (options) {
  return {
    type: actionTypes.pbOpenElementsMenu,
    options
  };
}

export function closeElementsMenu () {
  return {
    type: actionTypes.pbCloseElementsMenu
  };
}

export function toggleCategory (category) {
  return {
    type: actionTypes.pbToggleCategory,
    category
  };
}

export function toggleExpandElement (elementId) {
  return {
    type: actionTypes.pbToggleExpandElement,
    elementId
  };
}

export function collapseAll () {
  return {
    type: actionTypes.pbCollapseAll
  };
}

export function expandAll () {
  return {
    type: actionTypes.pbExpandAll
  };
}

export function overElement (elementId) {
  return {
    type: actionTypes.pbOverElement,
    elementId
  };
}

export function outElement (elementId) {
  return {
    type: actionTypes.pbOutElement,
    elementId
  };
}

export function selectElement (elementId) {
  return {
    type: actionTypes.pbSelectElement,
    elementId
  };
}

export function duplicateElement (elementId) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'duplicate',
      elementId
    }
  };
}

export function removeElement (elementId) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'remove',
      elementId
    }
  };
}

export function toggleElementVisibleOn (elementId, display) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeDisplay',
      elementId,
      display
    }
  };
}

export function changeElementAnimation (elementId, property, value) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeAnimation',
      elementId,
      property,
      value
    }
  };
}

export function changeElementPosition (elementId, property, value) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.pbDoAction,
      action: {
        type: 'changePosition',
        elementId,
        property,
        value,
        display
      }
    });
  };
}

export function changeElementLabel (elementId, value) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeLabel',
      elementId,
      value
    }
  };
}

export function changeElementStyle (elementId, property, value) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.pbDoAction,
      action: {
        type: 'changeStyle',
        elementId,
        property,
        value,
        display
      }
    });
  };
}

export function changeElementProperty (elementId, property, value) {
  return (dispatch, getState) => {
    const {display} = getState();
    dispatch({
      type: actionTypes.pbDoAction,
      action: {
        type: 'changeProp',
        elementId,
        property,
        value,
        display
      }
    });
  };
}

export function changeElementContent (elementId, value) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeContent',
      elementId,
      value
    }
  };
}

export function changeElementChildren (elementId, children) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeChildren',
      elementId,
      children
    }
  };
}

export function elementAddSchemaLink (elementId, propertyId, linkElementId, action) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'elementAddSchemaLink',
      elementId,
      propertyId,
      linkElementId,
      action
    }
  };
}

export function elementRemoveSchemaLink (elementId, propertyId, index) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'elementRemoveSchemaLink',
      elementId,
      propertyId,
      index
    }
  };
}

export function elementChangeSchemaLinkAction (elementId, propertyId, index, value) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'elementChangeSchemaLinkAction',
      elementId,
      propertyId,
      index,
      value
    }
  };
}

export function undoAction () {
  return {
    type: actionTypes.pbUndoAction
  };
}

export function redoAction () {
  return {
    type: actionTypes.pbRedoAction
  };
}

export function addElementAt (element, destination) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'new',
      element,
      destination
    }
  };
}

export function makeElementDynamic (elementId) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'makeDynamic',
      elementId
    }
  };
}

export function draggedComponent (dragInfo, dropInfo) {
  const action = {
    type: dragInfo.type
  };

  if (dragInfo.type === 'new') {
    action.element = {
      tag: dragInfo.element
    };
  } else if (dragInfo.type === 'move') {
    action.source = {
      id: dragInfo.id
    };
  }

  action.destination = {
    id: dropInfo.id,
    position: 0
  };

  if (typeof dropInfo.position !== 'undefined') {
    action.destination.position = dropInfo.position;
  }

  return {
    type: actionTypes.pbDoAction,
    action
  };
}

export function linkFormDataMode (elementId) {
  return {
    type: actionTypes.pbLinkFormDataMode,
    elementId
  };
}

export function closeLinkFormDataMode (elementId) {
  return {
    type: actionTypes.pbCloseLinkFormDataMode,
    elementId
  };
}

export function linkDataMode (elementId) {
  return {
    type: actionTypes.pbLinkDataMode,
    elementId
  };
}

export function closeLinkDataMode () {
  return {
    type: actionTypes.pbCloseLinkDataMode
  };
}

function extractChildren (children, data, draftData) {
  forEach(children, (childId) => {
    data[childId] = Object.assign({}, draftData[childId]);
    if (data[childId].children && data[childId].children.constructor === Array) {
      extractChildren(data[childId].children, data, draftData);
    }
  });
}

export function makeElementSymbol (elementId, title) {
  return (dispatch, getState) => {
    const symbolData = {};
    const draftData = getState().draft.data.data;

    symbolData.base = Object.assign({}, draftData[elementId]);
    if (symbolData.base.children && symbolData.base.children.constructor === Array) {
      extractChildren(symbolData.base.children, symbolData, draftData);
    }

    const data = {
      title,
      data: symbolData
    };

    return request({
      dispatch,
      type: actionTypes.makeElementSymbol,
      query: `
        mutation addSymbol ($data: SymbolInput!) {
          addSymbol (data: $data) {
            _id,
            title,
            data
          }
        }
      `,
      variables: {
        data: stringifyFields(data, ['data'])
      },
      params: {
        elementId
      }
    });
  };
}
