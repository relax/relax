import actionTypes from 'actions';

import colorReducer, {defaultState} from '../color';

describe('Color Reducer', () => {
  const color = '#ffffff';

  it('should return the initial state as default', () => {
    expect(
      colorReducer(undefined, {})
    ).toEqual(defaultState);
  });

  it('should return state with opened true appended to state when OPENING new color', () => {
    const action = {
      type: actionTypes.openNewColor
    };
    //  check if it has opened property
    expect(colorReducer(defaultState, action)).toBeInstanceOf(Object);

    // check if the the property opened is set to false
    expect(Object.getOwnPropertyDescriptor(colorReducer(defaultState, {}), 'opened').value).
    toEqual(false);
  });

  it('should return state with properties appended to state when CLOSING a color', () => {
    const action = {
      type: actionTypes.closeNewColor
    };
    const result = colorReducer(defaultState, action);

    // check if the the property opened is set to false
    expect(result.opened).toBeFalsy();

    // expect(colorReducer(defaultState, action)).ownPropertyDescriptor('editing').toBeFalsy();
    expect(result.label).toBe('');
    expect(result.value.value).toBe('#000000');
  });

  it('should handle OPEN_EDIT_COLOR', () => {
    const action = {
      type: actionTypes.openEditColor,
      color: {value: color, _id: 5, label: 'Test'}
    };
    const result = colorReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.opened).toBeTruthy();
    expect(result.editing).toBeTruthy();
    expect(result.editingId).toBe(5);
    expect(result.label).toBe('Test');
    expect(result.value.value).toBe(color);
  });

  it('should handle CHANGE_COLOR_PROPERTY', () => {
    const action = {
      type: actionTypes.changeColorProperty,
      property: 'default',
      value: 'default_value'
    };
    const result = colorReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result[action.property]).toBe(action.value);
  });

  it('should handle COLOR_LOADING', () => {
    const action = {
      type: actionTypes.colorLoading
    };
    const result = colorReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.loading).toBeTruthy();
  });

  it('should handle COLOR_SUCCESS', () => {
    const action = {
      type: actionTypes.colorSuccess
    };
    const result = colorReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual(defaultState);
  });

  it('should handle OPEN_REMOVE_COLOR', () => {
    const action = {
      type: actionTypes.openRemoveColor,
      id: 5
    };
    const result = colorReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.removeOpened).toBeTruthy();
    expect(result.removeId).toBe(5);
  });

  it('should handle CLOSE_REMOVE_COLOR', () => {
    const action = {
      type: actionTypes.closeRemoveColor,
      id: 5
    };
    const result = colorReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.removeOpened).toBeFalsy();
    expect(result.removeId).toBeNull();
  });
});
