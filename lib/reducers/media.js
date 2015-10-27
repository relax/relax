import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  uploadedData: [],
  singles: [],
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
          uploadedData: [],
          errors: action.errors
        });
      }

      return Object.assign({}, state, defaultState);
    case actionTypes.addMedia:
      return Object.assign({}, state, {
        uploadedData: [...state.uploadedData, action.data.addMedia]
      });
    case actionTypes.getMediaItem:
      return Object.assign({}, state, {
        singles: [...state.singles, action.data.mediaItem]
      });
    default:
      return state;
  }
}
