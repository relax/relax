import actionTypes from 'actions';


import dndReducer, {defaultState} from '../dnd';



describe('DND Reducer', () => {
  it('should return the initial state', () => {
    expect(dndReducer(defaultState, {})).toBe(defaultState);
  });

  it('should handle START_DRAGGING', () => {
    const action = {
      type: actionTypes.startDragging,
      draggingData: 'Test',
      dragInfo: 'Test2'
    };
    const result = dndReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.dragging).toBeTruthy();
    expect(result.draggingData).toBe('Test');
    expect(result.dragInfo).toBe('Test2');
  });

  it('should handle ON_DROPPABLE', () => {
    const action = {
      type: actionTypes.onDroppable,
      dropInfo: 'Test2'
    };
    const result = dndReducer(defaultState, action);

    expect(result).toBeInstanceOf(Object);
    expect(result.dropInfo).toBe(action.dropInfo);
  });

  it('should handle OUT_DROPPABLE', () => {
    const action = {
      type: actionTypes.outDroppable,
      id: 5
    };

    const theState = defaultState;
    // delete the key dropInfo of theState to assign it a new value
    delete theState.dropInfo;
    theState.dropInfo = {};
    theState.dropInfo.id = 5;

    expect(dndReducer(theState, {})).toBe(theState);
    expect(dndReducer(theState, action).dropInfo).toBeFalsy();
  });

  it('should handle STOP_DRAGGING', () => {
    expect(dndReducer(defaultState, {})).toBe(defaultState);
  });
});
