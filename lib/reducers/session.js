import {actionTypes as adminActionTypes} from '../actions/admin';

const defaultState = {
  data: '',
  errors: null
};

export default function pageReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case adminActionTypes.getAdmin:
      if (action.data.session) {
        return Object.assign({}, state, {
          data: action.data.session,
          errors: action.errors
        });
      }
      return state;
    default:
      return state;
  }
}
