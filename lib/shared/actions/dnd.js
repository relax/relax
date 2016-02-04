import actionTypes from 'actions';

export function startDragging (draggingData, dragInfo) {
  return {
    type: actionTypes.startDragging,
    draggingData,
    dragInfo
  };
}

export function onDroppable (dropInfo) {
  return {
    type: actionTypes.onDroppable,
    dropInfo
  };
}

export function outDroppable (id) {
  return {
    type: actionTypes.outDroppable,
    id
  };
}

export function stopDragging () {
  return {
    type: actionTypes.stopDragging
  };
}
