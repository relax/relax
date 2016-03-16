import actionTypes from 'actions';
import request from 'helpers/request';
import {fragmentToQL} from 'relax-fragments';

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
