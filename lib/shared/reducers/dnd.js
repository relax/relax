import actionTypes from 'actions';

const defaultState = {
  dragging: false,
  draggingData: {},
  dragInfo: false,
  dropInfo: false,
  droppableOrientation: 'vertical'
};

export default function dndReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.startDragging:
      return Object.assign({}, state, {
        dragging: true,
        draggingData: action.draggingData,
        dragInfo: action.dragInfo
      });
    case actionTypes.onDroppable:
      return Object.assign({}, state, {
        dropInfo: action.dropInfo
      });
    case actionTypes.outDroppable:
      if (state.dropInfo && state.dropInfo.id === action.id) {
        return Object.assign({}, state, {
          dropInfo: false
        });
      }
      return state;
    case actionTypes.stopDragging:
      return Object.assign({}, defaultState);
    default:
      return state;
  }
}
