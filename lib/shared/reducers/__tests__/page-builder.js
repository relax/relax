import expect from 'expect';

import pageBuilderReducer from '../page-builder';

describe('Page Builder Reducer', () => {
  it('Does not alter state if not a valid action', () => {
    const state = {something: 1};
    const newState = pageBuilderReducer(state, {type: 'not-valid'});
    expect(newState).toBe(state);
    expect(newState).toEqual(state);
  });
});
