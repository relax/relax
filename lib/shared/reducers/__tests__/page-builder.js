import chai from 'chai';
import pageBuilderReducer from '../page-builder';

const expect = chai.expect;

describe('Page Builder Reducer', () => {
  it('Does not alter state if not a valid action', () => {
    const state = {something: 1};
    const newState = pageBuilderReducer(state, {type: 'not-valid'});
    expect(newState).to.equal(state);
  });
});
