import {pushState} from 'redux-router';
import {mutation} from 'relate-js';

export function addTab (type, id) {
  return mutation({
    fragments: {
      addTab: {
        _id: 1,
        type: 1,
        item: {
          _id: 1,
          title: 1
        }
      }
    },
    variables: {
      addTab: {
        id: {
          value: id,
          type: 'ID!'
        },
        type: {
          value: type,
          type: 'String!'
        }
      }
    }
  });
}

export function removeTab (id, redirect) {
  return mutation({
    fragments: {
      removeTab: {
        _id: 1
      }
    },
    variables: {
      removeTab: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, redirect));
    }
  });
}
