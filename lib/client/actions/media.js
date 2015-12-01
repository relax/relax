import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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
