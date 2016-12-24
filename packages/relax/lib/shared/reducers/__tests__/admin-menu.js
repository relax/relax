import actionTypes from 'actions';
import chai from 'chai';

import adminMenuReducer, {defaultState} from '../admin-menu';

const expect = chai.expect;

describe('Admin menu Reducer', () => {
  it('should return the initial state', () => {
    const state = '';
    const action = {};
    const newState = adminMenuReducer(state, action);
    expect(newState).to.equal(state);
  });

  it('should return true if OPENING the admin menu', () => {
    const state = defaultState;
    const action = {type: actionTypes.openAdminMenu};
    const newState = adminMenuReducer(state, action);
    // Using equal(true) instead of .true to avoid JSLint error
    expect(newState).to.be.true;
  });

  it('show return false if CLOSING the admin menu', () => {
    const state = defaultState;
    const action = {type: actionTypes.closeAdminMenu};
    const newState = adminMenuReducer(state, action);
    // Using equal(true) instead of .true to avoid JSLint error
    expect(newState).to.be.false;
  });
});
