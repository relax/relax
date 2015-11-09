import actionTypes from '../client/actions/types';

const defaultState = {
  data: [],
  errors: null
};

export default function colorsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getRevisions:
      return Object.assign({}, state, {
        data: action.data.revisions,
        errors: action.errors
      });
    default:
      return state;
  }
}
