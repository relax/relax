import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function updateDraft (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updateDraft,
      query: `
        mutation updateDraft ($data: DraftInput!) {
          updateDraft (data: $data) {
            ${fragmentToQL(fragments.draft)}
          }
        }
      `,
      variables: {
        data
      }
    })
  );
}
