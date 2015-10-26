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
