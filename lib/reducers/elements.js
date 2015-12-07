import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';
import parseFields from '../helpers/parse-fields';

const defaultState = {};
const schemaParsableFields = ['properties'];
const schemaEntryParsableFields = ['properties'];
const menuParsableFields = ['data'];

export default function elementsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getElementData:
      if (action.data.schemaList) {
        const newSchemaList = [];
        forEach(action.data.schemaList, (schemaEntry) => {
          newSchemaList.push(parseFields(schemaEntry, schemaEntryParsableFields));
        });
        action.data.schemaList = newSchemaList;
      } else if (action.data.menu) {
        action.data.menu = parseFields(action.data.menu, menuParsableFields);
      } else if (action.data.schema) {
        action.data.schema = parseFields(action.data.schema, schemaParsableFields);
      }
      return Object.assign({}, state, {
        [action.params.elementId]: Object.assign({}, state[action.params.elementId] || {}, action.data)
      });
    default:
      return state;
  }
}
