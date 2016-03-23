import actionTypes from 'actions';
import request from 'helpers/request';
import {mutation} from 'relate-js';
import {fragmentToQL} from 'relax-fragments';

export function getMediaItem (fragments, id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getMediaItem,
      query: `
        query mediaItem ($id: String!) {
          mediaItem (id: $id) {
            ${fragmentToQL(fragments.media)}
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}

export function uploadMedia (fragments, file) {
  const data = {
    file
  };

  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addMedia,
      query: `
        mutation addMedia ($data: MediaInput!) {
          addMedia (data: $data) {
            ${fragmentToQL(fragments.media)}
          }
        }
      `,
      files: [file],
      variables: {
        data
      }
    })
  );
}

export function addingMedia (fileInfo) {
  return {
    type: actionTypes.addingMedia,
    fileInfo
  };
}

export function addMedia (fragments, file, fileInfo) {
  return {
    types: [
      'ADD_MEDIA_START',
      'ADD_MEDIA_SUCCESS',
      'ADD_MEDIA_ERROR'
    ],
    payload: [addingMedia.bind(null, fileInfo), uploadMedia.bind(null, fragments, file)],
    sequence: true
  };
}

const uploadsAtTime = 3;
let uploadsID = 0;
let uploadingNumber = 0;
let uploadQueue = [];

// Check if there are files to upload and initiates if there is
function checkUploadQueue (dispatch) {
  if (uploadQueue.length) {
    let numberToUpload = Math.min(uploadsAtTime - uploadingNumber, uploadQueue.length);
    uploadingNumber += numberToUpload;

    for (numberToUpload; numberToUpload > 0; numberToUpload--) {
      const file = uploadQueue.shift();
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch({
          type: actionTypes.uploadingMedia,
          fileId: file.id
        });
        mutation({
          fragments: {
            addMedia: {
              _id: 1,
              name: 1,
              fileName: 1,
              type: 1,
              size: 1,
              filesize: 1,
              dimension: {
                width: 1,
                height: 1
              },
              url: 1,
              absoluteUrl: 1,
              date: 1,
              thumbnail: 1,
              variations: 1
            }
          },
          variables: {
            addMedia: {
              data: {
                value: {
                  file: {
                    file: event.target.result,
                    filename: file.name
                  }
                },
                type: 'MediaInput!'
              }
            }
          }
        })(dispatch)
        .then(() => {
          dispatch({
            type: actionTypes.mediaUploadSuccess,
            fileId: file.id
          });
        })
        .catch(() => {
          dispatch({
            type: actionTypes.mediaUploadError,
            fileId: file.id
          });
        })
        .fin(() => {
          uploadingNumber--;
          checkUploadQueue(dispatch);
        });
      };
      reader.readAsDataURL(file);
    }
  }
}

export function uploadMediaFiles (files) {
  uploadQueue = uploadQueue.concat(files);

  return (dispatch) => {
    // add to files uploading
    dispatch({
      type: actionTypes.addFilesToUpload,
      files: files.map((file) => Object.assign(file, {id: uploadsID++}))
    });

    checkUploadQueue(dispatch);
  };
}

export function removeMedia (ids) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeMedia,
      query: `
        mutation removeMedia ($ids: [ID!]) {
          removeMedia (ids: $ids)
        }
      `,
      variables: {
        ids
      }
    })
  );
}

export function removeMediaItem (id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeMediaItem,
      query: `
        mutation removeMediaItem ($id: ID!) {
          removeMediaItem (id: $id) {
            _id
          }
        }
      `,
      variables: {
        id
      }
    })
  );
}
