import {mutation} from 'relate-js';

export function removeUser (id) {
  return mutation({
    fragments: {
      removeUser: {
        _id: 1
      }
    },
    variables: {
      removeUser: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  });
}

export function addUser (fragments, data) {
  return mutation({
    fragments: {
      addUser: fragments.users
    },
    variables: {
      addUser: {
        data: {
          value: data,
          type: 'UserInput!'
        }
      }
    }
  });
}
