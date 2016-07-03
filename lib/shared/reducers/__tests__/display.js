import chai from 'chai';
import displayReducer from '../display';
import actionTypes from 'actions';

const expect = chai.expect;
const defaultState = 'desktop';

describe('Display reducer', () => {
  it('should return the default state for other actions', () => {
    expect(displayReducer()).to.equal(defaultState);
  });
  it('should return action value for action type change display', () => {
    const action = {type: actionTypes.changeDisplay, value: 'test'};
    expect(displayReducer(defaultState, action)).to.equal(action.value);
  });
});
