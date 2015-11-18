import actionTypes from '../client/actions/types';
import parseFields from '../helpers/parse-fields';

const defaultState = {
  data: {
    title: '',
    slug: '',
    state: 'draft'
  },
  isSlugValid: false,
  errors: null
};
const parsableFields = ['data'];

export default function pageReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changePageToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changePageFields:
      return Object.assign({}, state, {
        data: action.values
      });
    case actionTypes.getPage:
    case actionTypes.getAdmin:
      if (action.data.page) {
        return Object.assign({}, state, {
          data: parseFields(action.data.page, parsableFields),
          errors: action.errors
        });
      }
      return state;
    case actionTypes.savePageFromDraft:
    case actionTypes.updatePage:
      return Object.assign({}, state, {
        data: action.data.updatePage || state.data,
        errors: action.errors
      });
    case actionTypes.addPage:
      return Object.assign({}, state, {
        data: action.data.addPage || state.data,
        errors: action.errors
      });
    case actionTypes.restorePage:
      return Object.assign({}, state, {
        data: action.data.restorePage || state.data,
        errors: action.errors
      });
    case actionTypes.validatePageSlug:
      return Object.assign({}, state, {
        isSlugValid: action.data.validatePageSlug,
        errors: action.errors
      });
    default:
      return state;
  }
}
