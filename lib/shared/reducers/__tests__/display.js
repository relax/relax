import actionTypes from 'actions';

import displayReducer, {defaultState} from '../display';

describe('Display reducer', () => {
  it('should return the default state for other actions', () => {
    expect(displayReducer()).toBe(defaultState);
  });
  it('should return action value for action type change display', () => {
    const action = {type: actionTypes.changeDisplay, value: 'test'};
    expect(displayReducer(defaultState, action)).toBe(action.value);
  });
});
