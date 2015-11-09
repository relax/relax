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

export function addMedia (fragments, file) {
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
