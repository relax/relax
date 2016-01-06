import cloneDeep from 'lodash.clonedeep';
import filter from 'lodash.filter';
import find from 'lodash.find';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: [],
  errors: null
};

export default function colorsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.colors) {
        return Object.assign({}, state, {
          data: action.data.colors,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.updateColor:
      const data = cloneDeep(state.data);
      const color = find(data, {_id: action.data.updateColor._id});
      let result;

      if (typeof color === 'undefined') {
        result = Object.assign({}, state, {
          data: [...state.data, action.data.updateColor],
          errors: action.errors
        });
      } else {
        Object.assign(color, action.data.updateColor);
        result = Object.assign({}, state, {
          data,
          errors: action.errors
        });
      }

      return result;
    case actionTypes.removeColor:
      return Object.assign({}, state, {
        data: filter(state.data, (colorIt) => {
          return colorIt._id !== action.data.removeColor._id;
        }),
        errors: action.errors
      });
    case actionTypes.addColor:
      return Object.assign({}, state, {
        data: [...state.data, action.data.addColor],
        errors: action.errors
      });
    default:
      return state;
  }
}
