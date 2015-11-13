import actionTypes from './types';

export function addOverlay (id, component, blur = true) {
  return {
    type: actionTypes.addOverlay,
    id,
    blur,
    component
  };
}

export function closeOverlay (id) {
  return {
    type: actionTypes.closeOverlay,
    id
  };
}
