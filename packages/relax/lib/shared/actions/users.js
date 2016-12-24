import actionTypes from 'actions';
import {push} from 'redux-router';
import {mutation} from 'relate-js';

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

export function toggleRemoveUser () {
  return {
    type: actionTypes.toggleRemoveUser
  };
}

export function removingUser () {
  return {
    type: actionTypes.removingUser
  };
}

export function removedUser () {
  return {
    type: actionTypes.removedUser
  };
}

export function toggleUserChangingPassword () {
  return {
    type: actionTypes.toggleUserChangingPassword
  };
}

export function changeUserPasswordValue (key, value) {
  return {
    type: actionTypes.changeUserPasswordValue,
    key,
    value
  };
}

export function updatingUserPassword () {
  return {
    type: actionTypes.updatingUserPassword
  };
}

export function updatedUserPassword () {
  return {
    type: actionTypes.updatedUserPassword
  };
}

export function removeUser (userId, redirect = false) {
  return (dispatch, getState) => {
    dispatch(removingUser());

    return mutation({
      fragments: {
        removeUser: {
          _id: 1
        }
      },
      variables: {
        removeUser: {
          id: {
            value: userId,
            type: 'ID!'
          }
        }
      },
      type: 'REMOVE'
    }, () => {
      dispatch(removedUser());

      if (redirect) {
        dispatch(push('/admin/users'));
      }
    })(dispatch, getState);
  };
}

export function updateUserPassword (userId, password) {
  return (dispatch, getState) => {
    dispatch(updatingUserPassword());

    return mutation({
      fragments: {
        updateUserPassword: 1
      },
      variables: {
        updateUserPassword: {
          id: {
            value: userId,
            type: 'ID!'
          },
          value: {
            value: password,
            type: 'String!'
          }
        }
      }
    }, () => {
      dispatch(updatedUserPassword());
    })(dispatch, getState);
  };
}
