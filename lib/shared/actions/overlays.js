import actionTypes from 'actions';

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
