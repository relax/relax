import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    items: [],
    count: 0
  },
  uploadedData: [],
  singles: {},
  errors: null
};

export default function mediaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      const changes = {};
      let hasChanges = false;

      if (action.data.media) {
        changes.data = changes.data || {};
        changes.data.items = action.data.media;
        hasChanges = true;
      }
      if (action.data.mediaCount) {
        changes.data = changes.data || {};
        changes.data.count = action.data.mediaCount.count || 0;
        hasChanges = true;
      }

      if (action.data.mediaItem) {
        changes.singles = changes.singles || {};
        changes.singles = Object.assign({}, state.singles, {
          [action.data.mediaItem._id]: Object.assign({}, state.singles[action.data.mediaItem._id] || {}, action.data.mediaItem)
        });
        hasChanges = true;
      }

      if (hasChanges) {
        changes.errors = action.errors;
        changes.uploadedData = [];
        return Object.assign({}, state, changes);
      }

      return Object.assign({}, state, defaultState);
    case actionTypes.addMedia:
      return Object.assign({}, state, {
        uploadedData: [...state.uploadedData, action.data.addMedia]
      });
    case actionTypes.getMediaItem:
      return Object.assign({}, state, {
        singles: Object.assign({}, state.singles, {
          [action.data.mediaItem._id]: Object.assign({}, state.singles[action.data.mediaItem._id] || {}, action.data.mediaItem)
        })
      });
    default:
      return state;
  }
}
