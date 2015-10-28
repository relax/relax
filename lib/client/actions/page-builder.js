import actionTypes from './types';

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

export function setGeneralElementsMenuSearch (value) {
  return {
    type: actionTypes.pbSetGeneralElementsMenuSearch,
    value
  };
}

export function setGeneralElementsMenuOpened (value) {
  return {
    type: actionTypes.pbSetGeneralElementsMenuOpened,
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
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeStyle',
      elementId,
      property,
      value
    }
  };
}

export function changeElementProperty (elementId, property, value) {
  return {
    type: actionTypes.pbDoAction,
    action: {
      type: 'changeProp',
      elementId,
      property,
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
