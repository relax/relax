import actionTypes from 'actions';

const defaultState = {};

export default function stylesMapReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.updateStylesMap:
      return action.map;
    default:
      return state;
  }
}
