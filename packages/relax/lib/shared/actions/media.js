import actionTypes from 'actions';
import {mutation} from 'relate-js';

export function changeMediaDisplay (display) {
  return {
    type: actionTypes.changeMediaDisplay,
    display
  };
}

const uploadsAtTime = 3;
let uploadsID = 0;
let uploadingNumber = 0;
let uploadQueue = [];

// Check if there are files to upload and initiates if there is
function checkUploadQueue (dispatch, getState) {
  if (uploadQueue.length) {
    let numberToUpload = Math.min(uploadsAtTime - uploadingNumber, uploadQueue.length);
    uploadingNumber += numberToUpload;

    const createOnload = file => event => {
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
      }, (result) => {
        if (result.addMedia) {
          dispatch({
            type: actionTypes.mediaUploadSuccess,
            fileId: file.id
          });
        } else {
          dispatch({
            type: actionTypes.mediaUploadError,
            fileId: file.id
          });
        }
      })(dispatch, getState)
          .catch(() => {
            dispatch({
              type: actionTypes.mediaUploadError,
              fileId: file.id
            });
          })
          .fin(() => {
            uploadingNumber--;
            checkUploadQueue(dispatch, getState);
          });
    };

    for (numberToUpload; numberToUpload > 0; numberToUpload--) {
      const file = uploadQueue.shift();
      const reader = new FileReader();
      reader.onload = createOnload(file);
      reader.readAsDataURL(file);
    }
  }
}

export function uploadMediaFiles (files) {
  uploadQueue = uploadQueue.concat(files);

  return (dispatch, getState) => {
    // add to files uploading
    dispatch({
      type: actionTypes.addFilesToUpload,
      files: files.map((file) => Object.assign(file, {id: uploadsID++}))
    });

    checkUploadQueue(dispatch, getState);
  };
}

export function removeMediaItems (ids) {
  return mutation({
    fragments: {
      removeMedia: {
        _id: 1
      }
    },
    variables: {
      removeMedia: {
        ids: {
          value: ids,
          type: '[ID!]'
        }
      }
    },
    type: 'REMOVE'
  });
}

export function removeMediaItem (id) {
  return mutation({
    fragments: {
      removeMediaItem: {
        _id: 1
      }
    },
    variables: {
      removeMediaItem: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  });
}
