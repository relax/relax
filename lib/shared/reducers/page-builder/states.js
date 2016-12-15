import actionTypes from 'actions';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.openDropDraftConfirmation:
      return Object.assign({}, state, {
        dropDraftConfirmation: true
      });
    case actionTypes.closeDropDraftConfirmation:
      return Object.assign({}, state, {
        dropDraftConfirmation: false
      });
    case actionTypes.openPushChangesConfirmation:
      return Object.assign({}, state, {
        pushChangesConfirmation: true
      });
    case actionTypes.closePushChangesConfirmation:
      return Object.assign({}, state, {
        pushChangesConfirmation: false
      });
    case actionTypes.openUnpublishConfirmation:
      return Object.assign({}, state, {
        unpublishConfirmation: true
      });
    case actionTypes.closeUnpublishConfirmation:
      return Object.assign({}, state, {
        unpublishConfirmation: false
      });
    case actionTypes.pbChangeState:
      return Object.assign({}, state, {
        state: action.state,
        stateMessage: action.message
      });
    case actionTypes.pbToggleEditing:
      return Object.assign({}, state, {
        editing: !state.editing
      });
    default:
      return state;
  }
};
