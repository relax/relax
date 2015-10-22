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
