import actionTypes from '../client/actions/types';

const defaultState = {
  data: [],
  errors: null
};

export default function mediaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.media) {
        return Object.assign({}, state, {
          data: action.data.media,
          errors: action.errors
        });
      }
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
}
