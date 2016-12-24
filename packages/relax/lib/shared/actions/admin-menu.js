import actionTypes from 'actions';

export function openAdminMenu () {
  return {
    type: actionTypes.openAdminMenu
  };
}

export function closeAdminMenu () {
  return {
    type: actionTypes.closeAdminMenu
  };
}
