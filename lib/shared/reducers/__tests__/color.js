import actionTypes from 'actions';
import chai from 'chai';

import colorReducer, {defaultState} from '../color';

const expect = chai.expect;

describe('Color Reducer', () => {
  const color = '#ffffff';

  it('should return the initial state as default', () => {
    expect(
      colorReducer(undefined, {})
    ).to.deep.equal(defaultState);
  });

  it('should return state with opened true appended to state when OPENING new color', () => {
    const action = {
      type: actionTypes.openNewColor
    };
    //  check if it has opened property
    expect(colorReducer(defaultState, action)).to.be.an('object');

    // check if the the property opened is set to false
    expect(Object.getOwnPropertyDescriptor(colorReducer(defaultState, {}), 'opened').value).
    to.equal(false);
  });

  it('should return state with properties appended to state when CLOSING a color', () => {
    const action = {
      type: actionTypes.closeNewColor
    };

    //  check if it has opened property
    expect(colorReducer(defaultState, action)).to.have.property('opened');

    // check if the the property opened is set to false
    expect(colorReducer(defaultState, action)).to.have.property('opened').to.be.false;

    // expect(colorReducer(defaultState, action)).ownPropertyDescriptor('editing').to.be.false;
    expect(colorReducer(defaultState, action)).to.have.property('label').to.equal('');
    expect(colorReducer(defaultState, action)).to.have.property('value').to.equal('#000000');
  });

  it('should handle OPEN_EDIT_COLOR', () => {
    const action = {
      type: actionTypes.openEditColor,
      color: {value: color, _id: 5, label: 'Test'}
    };
    expect(colorReducer(defaultState, action)).to.be.an('object');
    expect(colorReducer(defaultState, action)).to.have.property('opened').to.be.true;
    expect(colorReducer(defaultState, action)).to.have.property('editing').to.be.true;
    expect(colorReducer(defaultState, action)).to.have.property('editingId').to.equal(5);
    expect(colorReducer(defaultState, action)).to.have.property('label').to.equal('Test');
    expect(colorReducer(defaultState, action)).to.have.property('value')
                                               .to.have.property('value').to.equal(color);
  });

  it('should handle CHANGE_COLOR_PROPERTY', () => {
    const action = {
      type: actionTypes.changeColorProperty,
      property: 'default',
      value: 'default_value'
    };
    expect(colorReducer(defaultState, action)).to.be.an('object');
    expect(colorReducer(defaultState, action)).to.have.property(action.property).to.equal(action.value);
  });

  it('should handle COLOR_LOADING', () => {
    const action = {
      type: actionTypes.colorLoading
    };
    expect(colorReducer(defaultState, action)).to.be.an('object');
    expect(colorReducer(defaultState, action)).to.have.property('loading').to.be.true;
  });

  it('should handle COLOR_SUCCESS', () => {
    const action = {
      type: actionTypes.colorSuccess
    };
    expect(colorReducer(defaultState, action)).to.be.an('object');
    expect(colorReducer(defaultState, action)).to.deep.equal(defaultState);
  });

  it('should handle OPEN_REMOVE_COLOR', () => {
    const action = {
      type: actionTypes.openRemoveColor,
      id: 5
    };
    expect(colorReducer(defaultState, action)).to.be.an('object');
    expect(colorReducer(defaultState, action)).to.have.property('removeOpened').to.be.true;
    expect(colorReducer(defaultState, action)).to.have.property('removeId').to.equal(5);
  });

  it('should handle CLOSE_REMOVE_COLOR', () => {
    const action = {
      type: actionTypes.closeRemoveColor,
      id: 5
    };
    expect(colorReducer(defaultState, action)).to.be.an('object');
    expect(colorReducer(defaultState, action)).to.have.property('removeOpened').to.be.false;
    expect(colorReducer(defaultState, action)).to.have.property('removeId').to.be.null;
  });
});
