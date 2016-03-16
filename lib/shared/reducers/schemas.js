import actionTypes from 'actions';
import filter from 'lodash.filter';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function schemasReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.graphql: {
      const data = {};
      let hasData = false;
      if (action.data.schemas) {
        data.items = action.data.schemas;
        hasData = true;
      }
      if (action.data.schemasCount || action.data.schemasCount === 0) {
        data.count = action.data.schemasCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data,
          errors: action.errors
        });
      }
      return state;
    }
    case actionTypes.removeSchema:
      return Object.assign({}, state, {
        data: {
          items: filter(
            state.data.items,
            (schemaIt) => (schemaIt._id !== action.data.removeSchema._id)
          ),
          count: state.data.count - 1
        },
        errors: action.errors
      });
    default:
      return state;
  }
}
