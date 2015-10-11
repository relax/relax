import {actionTypes} from '../actions/page';

const defaultState = {
  data: '',
  errors: null
};

export default function pageReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.updatePage:
      return Object.assign({}, state, {
        data: {
          page: action.data.updatePage
        },
        errors: action.errors
      });
    case actionTypes.getPage:
    case actionTypes.getPages:
      return Object.assign({}, state, {
        data: action.data,
        errors: action.errors
      });
    default:
      return state;
  }
}
