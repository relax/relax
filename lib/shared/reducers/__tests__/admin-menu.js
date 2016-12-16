import actionTypes from 'actions';

import adminMenuReducer, {defaultState} from '../admin-menu';

describe('Admin menu Reducer', () => {
  it('should return the initial state', () => {
    const state = '';
    const action = {};
    const newState = adminMenuReducer(state, action);
    expect(newState).toBe(state);
  });

  it('should return true if OPENING the admin menu', () => {
    const state = defaultState;
    const action = {type: actionTypes.openAdminMenu};
    const newState = adminMenuReducer(state, action);
    // Using equal(true) instead of .true to avoid JSLint error
    expect(newState).toBeTruthy();
  });

  it('show return false if CLOSING the admin menu', () => {
    const state = defaultState;
    const action = {type: actionTypes.closeAdminMenu};
    const newState = adminMenuReducer(state, action);
    // Using equal(true) instead of .true to avoid JSLint error
    expect(newState).toBeFalsy();
  });
});
