import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  errors: null
};

export default function mediaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const data = {};

      let hasData;

      if (action.data.media) {
        data.items = action.data.media;
        hasData = true;
      }

      if (action.data.mediaCount || action.data.mediaCount === 0) {
        data.count = action.data.mediaCount.count || 0;
        hasData = true;
      }

      if (hasData) {
        return Object.assign({}, state, {
          data,
          errors: action.errors
        });
      }

      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
}
