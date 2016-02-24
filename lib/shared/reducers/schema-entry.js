import actionTypes from 'actions';
import parseFields from 'helpers/parse-fields';

const defaultState = {
  data: {
    title: '',
    slug: '',
    state: 'draft'
  },
  isSlugValid: false,
  errors: 'Not found'
};
const parsableFields = ['data', 'properties'];

export default function schemaEntryReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeSchemaEntryToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changeSchemaEntryFields:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.values)
      });
    case actionTypes.changeSchemaEntryProperty:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          properties: Object.assign({}, state.data.properties, {
            [action.key]: action.value
          })
        })
      });
    case actionTypes.graphql:
      if (action.data.schemaEntry) {
        return Object.assign({}, state, {
          data: Object.assign({}, state.data, parseFields(action.data.schemaEntry, parsableFields)),
          errors: action.errors
        });
      }
      return state;
    case actionTypes.updateSchemaEntry:
      return Object.assign({}, state, {
        data: parseFields(action.data.updateSchemaEntry, parsableFields) || state.data,
        errors: action.errors
      });
    case actionTypes.addSchemaEntry:
      return Object.assign({}, state, {
        data: parseFields(action.data.addSchemaEntry, parsableFields) || state.data,
        errors: action.errors
      });
    case actionTypes.restoreSchemaEntry:
      return Object.assign({}, state, {
        data: parseFields(action.data.restoreSchemaEntry, parsableFields) || state.data,
        errors: action.errors
      });
    case actionTypes.validateSchemaEntrySlug:
      return Object.assign({}, state, {
        isSlugValid: action.data.validateSchemaEntrySlug,
        errors: action.errors
      });
    default:
      return state;
  }
}
