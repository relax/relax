import actionTypes from './types';

export function addOverlay (id, component) {
  return {
    type: actionTypes.addOverlay,
    id,
    component
  };
}

export function closeOverlay (id) {
  return {
    type: actionTypes.closeOverlay,
    id
  };
}
