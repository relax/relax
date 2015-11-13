import filter from 'lodash.filter';

import actionTypes from '../client/actions/types';

const defaultState = [];

export default function overlaysReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.addOverlay:
      return [...state, {
        id: action.id,
        blur: action.blur,
        component: action.component
      }];
    case actionTypes.closeOverlay:
      return filter(state, (entry) => {
        return entry.id !== action.id;
      });
    default:
      return state;
  }
}
