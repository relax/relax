import chai from 'chai';
import adminMenuReducer from '../admin-menu';

const expect = chai.expect;

describe('Admin menu Reducer', () => {
  it('Returns the state if not opening or closing the admin menu', () => {
    const state = true;
    const actionTypes = {otherOption: true};
    const action = {type: actionTypes};
    const newState = adminMenuReducer(state, action);
    expect(newState).to.equal(state);
  });

  it('Returns true if opening the admin menu', () => {
    const state = true;
    const actionTypes = {openAdminMenu: true};
    const action = {type: actionTypes};
    const newState = adminMenuReducer(state, action);
    // Using equal(true) instead of .true to avoid JSLint error
    expect(newState).to.equal(true);
  });
});
