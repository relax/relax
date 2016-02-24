import actionTypes from 'actions';
import forEach from 'lodash.foreach';

import pageBuilderActions from './page-builder-actions';

const defaultState = {
  data: {
    data: {},
    actions: []
  },
  redos: [],
  expanded: {}, // for structure layer
  userExpanded: {}, // for structure layer
  errors: null
};

function doAction (data, action) {
  let result;
  if (action && action.constructor === Array) {
    const revertActions = [];
    let resultData = data;

    forEach(action, (actionPart) => {
      const actionFunction = pageBuilderActions[actionPart.type];
      const partResult = actionFunction && actionFunction(resultData, actionPart);
      if (partResult) {
        resultData = partResult.data;
        revertActions.unshift(partResult.revertAction);
      }
    });

    result = {
      data: resultData,
      revertAction: revertActions
    };
  } else {
    const actionFunction = pageBuilderActions[action.type];
    result = actionFunction && actionFunction(data, action);
  }
  return result;
}

export default function draftReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.graphql:
      if (action.data.draft) {
        const data = Object.assign({}, action.data.draft, {
          data: JSON.parse(action.data.draft.data),
          actions: JSON.parse(action.data.draft.actions)
        });
        return Object.assign({}, state, {
          data,
          redos: [],
          opened: {},
          errors: action.errors
        });
      }
      return state;
    case actionTypes.savePageFromDraft:
      const updateDraftData = Object.assign({}, action.data.updateDraft, {
        data: JSON.parse(action.data.updateDraft.data),
        actions: JSON.parse(action.data.updateDraft.actions)
      });
      return Object.assign({}, state, {
        data: updateDraftData || state.data,
        errors: action.errors
      });
    case actionTypes.dropDraft:
      const dropDraftData = Object.assign({}, action.data.dropDraft, {
        data: JSON.parse(action.data.dropDraft.data),
        actions: JSON.parse(action.data.dropDraft.actions)
      });
      return Object.assign({}, state, {
        data: dropDraftData || state.data,
        errors: action.errors
      });
    default:
      return state;
  }
}
