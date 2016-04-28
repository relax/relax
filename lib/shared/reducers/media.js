import actionTypes from 'actions';
import findIndex from 'lodash.findindex';

const defaultState = {
  display: 'grid',
  uploads: []
};

function changeUploadStatus ({state, id, status}) {
  const uploads = state.uploads.slice(0);
  const index = findIndex(uploads, ['id', id]);

  if (index !== -1) {
    uploads[index] = Object.assign({}, uploads[index], {
      status
    });
  }

  return Object.assign({}, state, {uploads});
}

export default function mediaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.addFilesToUpload: {
      const files = action.files.map((file) => ({
        id: file.id,
        name: file.name,
        status: 'queue' // queue || uploading || success || error
      }));
      return Object.assign({}, state, {
        uploads: state.uploads.concat(files)
      });
    }
    case actionTypes.changeMediaDisplay:
      return Object.assign({}, state, {
        display: action.display
      });
    case actionTypes.uploadingMedia:
      return changeUploadStatus({
        state,
        id: action.fileId,
        status: 'uploading'
      });
    case actionTypes.mediaUploadSuccess:
      return changeUploadStatus({
        state,
        id: action.fileId,
        status: 'success'
      });
    case actionTypes.mediaUploadError:
      return changeUploadStatus({
        state,
        id: action.fileId,
        status: 'error'
      });
    default:
      return state;
  }
}
