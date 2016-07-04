import chai from 'chai';
import pageBuilderReducer, {defaultState} from '../page-builder';

const expect = chai.expect;

describe('Page Builder Reducer', () => {
  it('Does not alter state if not a valid action', () => {
    const state = defaultState;
    const newState = pageBuilderReducer(state, {type: 'not-valid'});
    expect(newState).to.equal(state);
  });
});
