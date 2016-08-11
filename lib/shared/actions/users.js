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

export function updateUserName (userId, value) {
  return mutation({
    fragments: {
      updateUserName: {
        _id: 1,
        name: 1
      }
    },
    variables: {
      updateUserName: {
        id: {
          value: userId,
          type: 'ID!'
        },
        value: {
          value,
          type: 'String!'
        }
      }
    }
  });
}

export function updateUserUsername (userId, value) {
  return mutation({
    fragments: {
      updateUserUsername: {
        _id: 1,
        username: 1
      }
    },
    variables: {
      updateUserUsername: {
        id: {
          value: userId,
          type: 'ID!'
        },
        value: {
          value,
          type: 'String!'
        }
      }
    }
  });
}

export function updateUserEmail (userId, value) {
  return mutation({
    fragments: {
      updateUserEmail: {
        _id: 1,
        email: 1
      }
    },
    variables: {
      updateUserEmail: {
        id: {
          value: userId,
          type: 'ID!'
        },
        value: {
          value,
          type: 'String!'
        }
      }
    }
  });
}
