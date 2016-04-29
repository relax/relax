import actionTypes from 'actions';
import request from 'helpers/request';

export function authenticate (dispatch) {
  return (nextState, replaceState, callback) => {
    if (dispatch) {
      request({
        dispatch,
        type: actionTypes.authenticate,
        query: `
          query {
            session {
              userId
            }
          }
        `
      }).then(() => {
        callback();
      }).catch(() => {
        replaceState(null, '/admin/login');
      });
    } else {
      callback();
    }
  };
}
