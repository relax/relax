import forEach from 'lodash.foreach';

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
        return Object.assign({}, state, changes);
      }

      return Object.assign({}, state, defaultState);
    case actionTypes.addingMedia:
      return Object.assign({}, state, {
        uploadedData: [...state.uploadedData, {
          uploading: true,
          name: action.fileInfo.name,
          preview: action.fileInfo.preview
        }]
      });
    case actionTypes.addMedia:
      const newUploadedData = [];
      const newMedia = action.data.addMedia;

      forEach(state.uploadedData, (data) => {
        if (data.preview && data.name === newMedia.name) {
          newUploadedData.push(Object.assign({}, data, newMedia, {
            uploading: false
          }));
        } else {
          newUploadedData.push(data);
        }
      });

      return Object.assign({}, state, {
        uploadedData: newUploadedData
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
