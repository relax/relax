import {actionTypes} from '../actions/page';
import {actionTypes as adminActionTypes} from '../actions/admin';

const defaultState = {
  data: {
    title: 'New page',
    slug: 'new-page',
    state: 'draft'
  },
  errors: 'Not found'
};

export default function pageReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changePageToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changePageFields:
      return Object.assign({}, state, {
        data: action.values
      });
    case adminActionTypes.getAdmin:
      if (action.data.page) {
        return Object.assign({}, state, {
          data: action.data.page,
          errors: action.errors
        });
      }
      return Object.assign({}, state, defaultState);
    case actionTypes.updatePage:
      return Object.assign({}, state, {
        data: action.data.updatePage,
        errors: action.errors
      });
    case actionTypes.addPage:
      return Object.assign({}, state, {
        data: action.data.addPage,
        errors: action.errors
      });
    default:
      return state;
  }
}
