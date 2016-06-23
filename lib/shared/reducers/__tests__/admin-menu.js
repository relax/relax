import expect from 'expect';

import adminMenuReducer from '../admin-menu';

describe('Admin menu Reducer', () => {
  it('Returns the state if not opening or closing the admin menu', () => {
    const state = true;
    const actionTypes = {otherOption : true} ;
    const action = { type : actionTypes } ;
    const newState = adminMenuReducer(state, action);
    expect(newState).toBe(state);
    expect(newState).toEqual(state);
  });

  it('Returns true if opening the admin menu', () => {
    const state = true;
     const actionTypes = {openAdminMenu : true} ;
    const action = { type : actionTypes } ;
    const newState = adminMenuReducer(state, action);
    expect(newState).toBe(true);
    expect(newState).toEqual(true);
  });

});