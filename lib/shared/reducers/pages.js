import actionTypes from 'actions';
import filter from 'lodash.filter';

const defaultState = {
  items: [],
  count: -1,
  errors: null
};

export default function pagesReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.graphql:
      const newState = {
        errors: action.errors
      };
      let hasData = false;
      if (action.data.pages) {
        newState.items = action.data.pages;
        hasData = true;
      }
      if (action.data.pagesCount || action.data.pagesCount === 0) {
        newState.count = action.data.pagesCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, newState);
      }
      return state;
    case actionTypes.addPage:
      if (action.data.addPage) {
        return Object.assign({}, state, {
          items: [action.data.addPage, ...state.items],
          count: state.count + 1
        });
      }
      return state;
    case actionTypes.removePage:
      return Object.assign({}, state, {
        data: {
          items: filter(state.data.items, (pageIt) => {
            return pageIt._id !== action.data.removePage._id;
          }),
          count: state.data.count - 1
        },
        errors: action.errors
      });
    case actionTypes.duplicatePage:
      return Object.assign({}, state, {
        data: {
          items: [...state.data.items, action.data.duplicatePage],
          count: state.data.count
        },
        errors: action.errors
      });
    default:
      return state;
  }
}
