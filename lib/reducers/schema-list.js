import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function schemaListReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const data = {};
      let hasData = false;
      if (action.data.schemaList) {
        data.items = action.data.schemaList;
        hasData = true;
      }
      if (action.data.schemaListCount || action.data.schemaListCount === 0) {
        data.count = action.data.schemaListCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data: data,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.removeSchemaEntry:
      return Object.assign({}, state, {
        data: {
          items: filter(state.data.items, (schemaEntryIt) => {
            return schemaEntryIt._id !== action.data.removeSchemaEntry._id;
          }),
          count: state.data.count - 1
        },
        errors: action.errors
      });
    default:
      return state;
  }
}
