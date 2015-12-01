import filter from 'lodash.filter';
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
        if (state.uploadedData.length > 0) {
          changes.uploadedData = filter(state.uploadedData, 'uploading', true);
        }
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
    case actionTypes.removeMediaItem:
      const removeChanges = {};
      const removeId = action.data.removeMediaItem._id;
      if (state.singles[removeId]) {
        const newSingles = Object.assign({}, state.singles);
        delete newSingles[removeId];
        removeChanges.singles = newSingles;
      }
      removeChanges.data = {
        items: filter(state.data.items, (item) => item._id !== removeId),
        count: state.data.count - 1
      };
      return Object.assign({}, state, removeChanges);
    default:
      return state;
  }
}
