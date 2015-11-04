import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

export function removeSchemaEntry (fragments, schemaId, id) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.removeSchemaEntry,
      query: `
        mutation removeSchemaEntry ($schemaId: ID!, $id: ID!) {
          removeSchemaEntry (schemaId: $schemaId, id: $id) {
            ${fragmentToQL(fragments.schemaEntry)}
          }
        }
      `,
      variables: {
        id,
        schemaId
      }
    })
  );
}
