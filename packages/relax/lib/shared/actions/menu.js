import actionTypes from 'actions';
import {mutation} from 'relate-js';
import {push} from 'redux-router';

export function addMenu (data, redirect = false) {
  return mutation({
    fragments: {
      addMenu: {
        _id: 1,
        title: 1,
        date: 1
      }
    },
    variables: {
      addMenu: {
        data: {
          value: data,
          type: 'MenuInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(push(`/admin/menus/${result.addMenu._id}`));
    }
  });
}

export function removeMenu (id, redirect) {
  return mutation({
    fragments: {
      removeMenu: {
        _id: 1
      }
    },
    variables: {
      removeMenu: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(push('/admin/menus'));
    }
  });
}

export function updateMenuTitle (_id, title) {
  return mutation({
    fragments: {
      updateMenu: {
        _id: 1,
        title: 1
      }
    },
    variables: {
      updateMenu: {
        data: {
          value: {_id, title},
          type: 'MenuInput!'
        }
      }
    }
  });
}

export function updateMenuData (_id) {
  return (dispatch, getState) => {
    const data = getState().menu;
    return mutation({
      fragments: {
        updateMenu: {
          _id: 1,
          data: 1
        }
      },
      variables: {
        updateMenu: {
          data: {
            value: {_id, data},
            type: 'MenuInput!'
          }
        }
      }
    })(dispatch, getState);
  };
}

export function draggedMenuItem (dragInfo, dropInfo) {
  let action;

  const destination = {
    id: dropInfo.id,
    position: dropInfo.position ? dropInfo.position : 0
  };

  if (dropInfo.id === 'delete') {
    action = {
      type: actionTypes.removeMenuItem,
      id: dragInfo.item.id
    };
  } else if (dragInfo.type === 'new') {
    action = {
      type: actionTypes.addMenuItem,
      item: dragInfo.item,
      destination
    };
  } else if (dragInfo.type === 'move') {
    action = {
      type: actionTypes.moveMenuItem,
      id: dragInfo.item.id,
      destination
    };
  }

  return action;
}
