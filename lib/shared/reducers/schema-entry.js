import actionTypes from 'actions';
import forEach from 'lodash.foreach';

const defaultState = {
  saving: false,
  saved: false,
  properties: {}
};

export default function schemaEntryReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeSchemaEntryToDefaults: {
      const newState = Object.assign({}, defaultState, {
        properties: {}
      });

      forEach(action.schema.properties, (property) => {
        if (property.default) {
          newState.properties[property.id] = property.default;
        }
      });

      return newState;
    }
    case actionTypes.changeSchemaEntryProperty:
      return Object.assign({}, state, {
        properties: Object.assign({}, state.properties, {
          [action.key]: action.value
        })
      });
    case actionTypes.schemaEntrySaving:
      return Object.assign({}, state, {
        saving: true
      });
    case actionTypes.schemaEntrySaved:
      return Object.assign({}, state, {
        saving: false,
        saved: true
      });
    case actionTypes.schemaEntrySavedOut:
      return Object.assign({}, state, {
        saving: false,
        saved: false
      });

    case actionTypes.changeSchemaEntryFields:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.values)
      });
    default:
      return state;
  }
}
