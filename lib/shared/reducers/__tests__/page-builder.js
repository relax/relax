import pageBuilderReducer, {defaultState} from '../page-builder';

describe('Page Builder Reducer', () => {
  it('does not alter state if not a valid action', () => {
    const state = defaultState;
    const newState = pageBuilderReducer(defaultState, {type: 'not-valid'});
    expect(newState).toBe(state);
  });
});
