import actionTypes from 'actions';

const defaultState = 'desktop';

export default function displayReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeDisplay:
      return action.value;
    default:
      return state;
  }
}
