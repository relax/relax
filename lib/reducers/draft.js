import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';
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
  const actionFunction = pageBuilderActions[action.type];
  return actionFunction && actionFunction(data, action);
}

export default function draftReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
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
    case actionTypes.pbDoAction:
      const actionResult = doAction(state.data.data, action.action);
      return Object.assign({}, state, {
        redos: [],
        data: Object.assign({}, state.data, {
          data: actionResult.data,
          actions: [...state.data.actions, actionResult.revertAction]
        })
      });
    case actionTypes.pbUndoAction:
      if (state.data.actions.length > 0) {
        const actions = state.data.actions.slice(0);
        const undoActionResult = doAction(state.data.data, actions.pop());
        return Object.assign({}, state, {
          redos: [...state.redos, undoActionResult.revertAction],
          data: Object.assign({}, state.data, {
            data: undoActionResult.data,
            actions
          })
        });
      }
      return state;
    case actionTypes.pbRedoAction:
      if (state.redos.length > 0) {
        const redos = state.redos.slice(0);
        const redoActionResult = doAction(state.data.data, redos.pop());
        return Object.assign({}, state, {
          redos,
          data: Object.assign({}, state.data, {
            data: redoActionResult.data,
            actions: [...state.data.actions, redoActionResult.revertAction]
          })
        });
      }
      return state;
    case actionTypes.saveStyle:
      const styleActionResult = doAction(state.data.data, {
        type: 'changeProp',
        property: 'style',
        value: action.data.addStyle._id,
        elementId: action.params.elementId,
        display: action.params.display
      });
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          data: styleActionResult.data
        })
      });
    case actionTypes.pbSelectElement:
      const expandedChanges = {};
      let element = state.data.data[action.elementId];
      if (element) {
        while (element && element.parent) {
          element = state.data.data[element.parent];
          if (element && element.id !== 'body') {
            expandedChanges[element.id] = true;
          }
        }
      }
      return Object.assign({}, state, {
        expanded: expandedChanges
      });
    case actionTypes.pbToggleExpandElement:
      const isExpanded = state.expanded[action.elementId] || state.userExpanded[action.elementId];
      return Object.assign({}, state, {
        expanded: Object.assign({}, state.expanded, {
          [action.elementId]: !isExpanded
        }),
        userExpanded: Object.assign({}, state.userExpanded, {
          [action.elementId]: !isExpanded
        })
      });
    case actionTypes.pbExpandAll:
      const allExpanded = {};
      forEach(state.data.data, (elementIt, elementId) => {
        allExpanded[elementId] = true;
      });
      return Object.assign({}, state, {
        userExpanded: allExpanded
      });
    case actionTypes.pbCollapseAll:
      return Object.assign({}, state, {
        expanded: {},
        userExpanded: {}
      });
    default:
      return state;
  }
}
