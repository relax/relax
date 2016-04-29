import actionTypes from 'actions';

const defaultState = {
  userId: null
};

export default function sessionReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.authenticate:
      return Object.assign({}, state, {userId: action.data.userId});
    default:
      return state;
  }
}
