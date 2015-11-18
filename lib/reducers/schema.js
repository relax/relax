import actionTypes from '../client/actions/types';
import parseFields from '../helpers/parse-fields';

const defaultState = {
  data: {
    title: '',
    slug: ''
  },
  errors: null
};

const parsableFields = ['data', 'properties'];

export default function schemaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeSchemaToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changeSchemaFields:
      return Object.assign({}, state, {
        data: action.values
      });
    case actionTypes.getSchema:
    case actionTypes.getAdmin:
      if (action.data.schema) {
        return Object.assign({}, state, {
          data: parseFields(action.data.schema, parsableFields),
          errors: action.errors
        });
      }
      return state;
    case actionTypes.updateSchema:
      return Object.assign({}, state, {
        data: parseFields(action.data.updateSchema, parsableFields) || state.data,
        errors: action.errors
      });
    case actionTypes.addSchema:
      return Object.assign({}, state, {
        data: parseFields(action.data.addSchema, parsableFields) || state.data,
        errors: action.errors
      });
    case actionTypes.restoreSchema:
      return Object.assign({}, state, {
        data: parseFields(action.data.restoreSchema, parsableFields),
        errors: action.errors
      });
    case actionTypes.validateSchemaSlug:
      return Object.assign({}, state, {
        isSlugValid: action.data.validateSchemaSlug,
        errors: action.errors
      });
    default:
      return state;
  }
}
