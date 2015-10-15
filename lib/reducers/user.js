import {actionTypes as adminActionTypes} from '../actions/admin';

const defaultState = {
  data: {},
  errors: 'Not found'
};

export default function userReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case adminActionTypes.getAdmin:
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
