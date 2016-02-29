import actionTypes from 'actions';
import request from 'helpers/request';

export function graphql ({query, variables}, connectors) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.graphql,
      query,
      variables,
      params: {
        connectors
      }
    });
  };
}

export function removeConnector (id) {
  return {
    type: actionTypes.removeConnector,
    id
  };
}
