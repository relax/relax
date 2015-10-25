import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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
