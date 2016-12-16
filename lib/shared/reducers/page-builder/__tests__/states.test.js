import actionTypes from 'actions';

import statesReducer from '../states';
import {defaultState} from '../index';

describe('Page builder states actions', () => {
  it('should handle PB_CHANGE_STATE', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.pbChangeState,
      state: 'saving',
      message: 'Saving draft'
    });

    expect(newState).toBeInstanceOf(Object);

    expect(newState.state).toBe('saving');
    expect(newState.stateMessage).toBe('Saving draft');
  });

  it('should handle OPEN_DROP_DRAFT_CONFIRMATION', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.openDropDraftConfirmation
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.dropDraftConfirmation).toBeTruthy();
  });

  it('should handle CLOSE_DROP_DRAFT_CONFIRMATION', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.closeDropDraftConfirmation
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.dropDraftConfirmation).toBeFalsy();
  });

  it('should handle OPEN_PUSH_CHANGES_CONFIRMATION', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.openPushChangesConfirmation
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.pushChangesConfirmation).toBeTruthy();
  });

  it('should handle CLOSE_PUSH_CHANGES_CONFIRMATION', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.closePushChangesConfirmation
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.pushChangesConfirmation).toBeFalsy();
  });

  it('should handle OPEN_UNPUBLISH_CONFIRMATION', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.openUnpublishConfirmation
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.unpublishConfirmation).toBeTruthy();
  });

  it('should handle CLOSE_UNPUBLISH_CONFIRMATION', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.closeUnpublishConfirmation
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.unpublishConfirmation).toBeFalsy();
  });

  it('should handle PB_TOGGLE_EDITING', () => {
    const newState = statesReducer(defaultState, {
      type: actionTypes.pbToggleEditing
    });

    expect(newState).not.toBe(defaultState);
    expect(newState.editing).toBe(!defaultState.editing);

    const newerState = statesReducer(newState, {
      type: actionTypes.pbToggleEditing
    });

    expect(newerState).not.toBe(newState);
    expect(newerState.editing).toBe(!newState.editing);
  });
});
