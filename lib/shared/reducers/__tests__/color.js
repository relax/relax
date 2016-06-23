import chai from 'chai';
import colorReducer from '../color';

const expect = chai.expect;

describe('Color Reducer', () => {
  const defaultState = {
    opened: false,
    removeOpened: false,
    removeId: null,
    loading: false,
    editing: false,
    editingId: null,
    label: '',
    value: '#000000'
  };

  it('should return the initial state', () => {
    expect(
      colorReducer(undefined, {})
    ).to.deep.equal(defaultState);
  });

  it('should return state with opened true appended to state', () => {
    //  check if it has opened property
    expect(
      colorReducer(defaultState, {}), 'opened'
    ).to.be.an('object');

    // check if the the property opened is set to false
    expect(Object.getOwnPropertyDescriptor(
      colorReducer(defaultState, {}), 'opened'
    ).value).to.equal(false);
  });
});
