import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function pagesReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const data = {};
      let hasData = false;
      if (action.data.pages) {
        data.items = action.data.pages;
        hasData = true;
      }
      if (action.data.pagesCount || action.data.pagesCount === 0) {
        data.count = action.data.pagesCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data: data,
          errors: action.errors
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
