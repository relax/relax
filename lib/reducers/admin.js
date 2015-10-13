import {actionTypes} from '../actions/admin';

const defaultState = {
  data: '',
  errors: null
};

export default function adminReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      return Object.assign({}, state, {
        data: action.data,
        errors: action.errors
      });
    case actionTypes.updatePage:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {page: action.data.updatePage}),
        errors: action.errors
      });
    default:
      return state;
  }
}
