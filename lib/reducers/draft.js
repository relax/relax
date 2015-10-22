import actionTypes from '../client/actions/types';

const defaultState = {
  data: {},
  errors: null
};

export default function draftReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.draft) {
        return Object.assign({}, state, {
          data: action.data.draft,
          errors: action.errors
        });
      }
      return state;
    default:
      return state;
  }
}
