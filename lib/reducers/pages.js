import {actionTypes as adminActionTypes} from '../actions/admin';

const defaultState = {
  data: '',
  errors: null
};

export default function pagesReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case adminActionTypes.getAdmin:
      const data = {};
      let hasData = false;
      if (action.data.pages) {
        data.items = action.data.pages;
        hasData = true;
      }
      if (action.data.pagesCount || action.data.pagesCount === 0) {
        data.count = action.data.pagesCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data: data,
          errors: action.errors
        });
      }
      return state;
    default:
      return state;
  }
}
