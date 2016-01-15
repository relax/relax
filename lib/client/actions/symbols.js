import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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
