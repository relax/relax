import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';
import parseFields from '../helpers/parse-fields';

const defaultState = {};
const schemaEntryParsableFields = ['properties'];
const menuParsableFields = ['data'];

export default function elementsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getElementData:
      if (action.data.schemaList) {
        let newSchemaList = [];
        forEach(action.data.schemaList, (schemaEntry) => {
          newSchemaList.push(parseFields(schemaEntry, schemaEntryParsableFields));
        });
        action.data.schemaList = newSchemaList;
      } else if (action.data.menu) {
        action.data.menu = parseFields(action.data.menu, menuParsableFields);
      }
      return Object.assign({}, state, {
        [action.params.elementId]: action.data
      });
    default:
      return state;
  }
}
