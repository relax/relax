import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function usersReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const data = {};
      let hasData = false;
      if (action.data.users) {
        data.items = action.data.users;
        hasData = true;
      }
      if (action.data.usersCount || action.data.usersCount === 0) {
        data.count = action.data.usersCount.count || 0;
        hasData = true;
      }
      if (hasData) {
        return Object.assign({}, state, {
          data: data,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.removeUser:
      return Object.assign({}, state, {
        data: {
          items: filter(state.data.items, (userIt) => {
            return userIt._id !== action.data.removeUser._id;
          }),
          count: state.data.count - 1
        },
        errors: action.errors
      });
    case actionTypes.addUser:
      return Object.assign({}, state, {
        data: {
          items: [...state.data.items, action.data.addUser],
          count: state.data.count + 1
        },
        errors: action.errors
      });
    default:
      return state;
  }
}
