import actionTypes from 'actions';
import request from 'helpers/request';
import {fragmentToQL} from 'relax-fragments';

export function getSymbol (symbolId, fragments) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getSymbol,
      query: `
        query symbol ($id: ID!) {
          symbol (id: $id) {
            ${fragmentToQL(fragments.symbol)}
          }
        }
      `,
      variables: {
        id: symbolId
      }
    })
  );
}
