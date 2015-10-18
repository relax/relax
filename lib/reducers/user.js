import actionTypes from '../client/actions/types';

const defaultState = {
  data: {},
  errors: 'Not found'
};

export default function userReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.user) {
        return Object.assign({}, state, {
          data: action.data.user,
          errors: action.errors
        });
      }
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
}
