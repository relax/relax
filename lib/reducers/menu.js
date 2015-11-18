import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    title: '',
    slug: '',
    data: []
  },
  errors: 'Not found'
};

export default function menuReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeMenuToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changeMenuFields:
      return Object.assign({}, state, {
        data: action.values
      });
    case actionTypes.getAdmin:
      if (action.data.menu) {
        return Object.assign({}, state, {
          data: action.data.menu,
          errors: action.errors
        });
      }
      return Object.assign({}, state, defaultState);
    case actionTypes.updateMenu:
      return Object.assign({}, state, {
        data: action.data.updateMenu,
        errors: action.errors
      });
    case actionTypes.addMenu:
      return Object.assign({}, state, {
        data: action.data.addMenu,
        errors: action.errors
      });
    case actionTypes.validateMenuSlug:
      return Object.assign({}, state, {
        isSlugValid: action.data.validateMenuSlug,
        errors: action.errors
      });
    default:
      return state;
  }
}
