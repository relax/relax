import actionTypes from 'actions';
import elements from 'elements';
import forEach from 'lodash.foreach';
import Relate from 'relate-js';

import pageBuilderActions from './page-builder-actions';

const categories = [
  'structure',
  'content',
  'media',
  'form'
];
forEach(elements, (element) => {
  if (element.settings && element.settings.category) {
    if (categories.indexOf(element.settings.category) === -1) {
      categories.push(element.settings.category);
    }
  }
});
categories.push('other');
const categoriesCollapsed = {};
forEach(categories, (category) => {categoriesCollapsed[category] = false;});

const defaultState = {
  id: null,
  itemId: null,
  data: {},
  actions: [],
  redos: [],
  state: null, // null || loading || error || success
  stateMessage: '',
  expanded: {}, // for structure layer
  userExpanded: {}, // for structure layer
  editing: true,
  elements,
  selectedId: null,
  selectedElement: null,
  selectedParent: null,
  selectedPath: [],
  overedId: null,
  focusElementId: null,
  linkingData: false,
  linkingDataElementId: null,
  linkingDataElement: null,
  linkingFormData: false,
  linkingFormDataElementId: null,
  categories,
  categoriesCollapsed,
  elementsMenuOpened: false,
  elementsMenuOptions: {},
  elementsMenuSpot: null,
  menuTab: 'style'
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

function getElementPath (selectedElement, data) {
  const result = [];
  let current = selectedElement;

  while (current.parent) {
    current = data[current.parent];
    result.unshift(current);
  }

  return result;
}

function inPath (elementId, targetId, data) {
  let found = false;
  let current = data[elementId];

  while (!found && current.parent) {
    if (current.parent === targetId) {
      found = true;
    }
    current = data[current.parent];
  }

  return found;
}

function checkOverAndSelected (state) {
  const changes = {
    selectedId: state.selectedId,
    overedId: state.overedId
  };

  // Check if inside the focused element
  if (state.focusElementId) {
    if (state.overedId && !inPath(state.overedId, state.focusElementId, state.data)) {
      changes.overedId = null;
    }
    if (state.selectedId && !inPath(state.selectedId, state.focusElementId, state.data)) {
      changes.selectedId = null;
    }
  }

  if (state.selectedId && changes.selectedId) {
    const selectedElement = state.data[state.selectedId];
    changes.selectedElement = selectedElement;
    changes.selectedParent = selectedElement && selectedElement.parent;
    changes.selectedPath = selectedElement && getElementPath(selectedElement, state.data);
    changes.selectedId = selectedElement && state.selectedId;
  }

  if (state.linkingDataElementId) {
    const linkingDataElement = state.data[state.linkingDataElementId];
    changes.linkingDataElement = linkingDataElement;
    changes.linkingDataElementId = linkingDataElement && state.linkingDataElementId;
  }

  return Object.assign({}, state, changes);
}

export default function pageBuilderReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.pbChangeState:
      return Object.assign({}, state, {
        state: action.state,
        stateMessage: action.message
      });
    case Relate.actionTypes.query:
    case Relate.actionTypes.mutation: {
      let draftData;

      if (action.data.draft) {
        draftData = action.data.draft;
      } else if (action.data.restoreRevision && action.data.restoreRevision.draft) {
        draftData = action.data.restoreRevision.draft;
      } else if (action.data.saveDraft && action.data.saveDraft.draft) {
        draftData = action.data.saveDraft.draft;
      } else if (action.data.dropDraft) {
        draftData = action.data.dropDraft;
      }

      if (draftData) {
        const dataChange = {};

        if (draftData.data) {
          dataChange.data = JSON.parse(draftData.data);
        }
        if (draftData.actions) {
          dataChange.actions = JSON.parse(draftData.actions);
        }
        if (draftData._id) {
          dataChange.id = draftData._id;
        }
        if (draftData.itemId) {
          dataChange.itemId = draftData.itemId;
        }

        return Object.assign({}, defaultState, dataChange);
      }
      return state;
    }
    case actionTypes.pbDoAction: {
      const actionResult = doAction(state.data, action.action);
      return checkOverAndSelected(Object.assign({}, state, {
        data: actionResult.data,
        actions: [...state.actions, actionResult.revertAction],
        redos: []
      }));
    }
    case actionTypes.pbUndoAction: {
      if (state.data.actions.length > 0) {
        const actions = state.actions.slice(0);
        const undoActionResult = doAction(state.data, actions.pop());
        return checkOverAndSelected(Object.assign({}, state, {
          redos: [...state.redos, undoActionResult.revertAction],
          data: undoActionResult.data,
          actions
        }));
      }
      return state;
    }
    case actionTypes.pbRedoAction:
      if (state.redos.length > 0) {
        const redos = state.redos.slice(0);
        const redoActionResult = doAction(state.data, redos.pop());
        return checkOverAndSelected(Object.assign({}, state, {
          redos,
          data: redoActionResult.data,
          actions: [...state.actions, redoActionResult.revertAction]
        }));
      }
      return state;
    case actionTypes.makeElementSymbol: {
      const elementToSymbol = state.data[action.params.elementId];
      const elementToSymbolParent = state.data[elementToSymbol.parent];
      const elementToSymbolPosition = elementToSymbolParent.children.indexOf(action.params.elementId);

      const makeElementSymbolActionResult = doAction(state.data, [
        {
          type: 'remove',
          elementId: action.params.elementId
        },
        {
          type: 'new',
          destination: {
            id: elementToSymbol.parent,
            position: elementToSymbolPosition
          },
          element: {
            tag: 'Symbol',
            props: {
              symbolId: action.data.addSymbol._id
            }
          }
        }
      ]);
      return checkOverAndSelected(Object.assign({}, state, {
        redos: [],
        data: makeElementSymbolActionResult.data,
        actions: [...state.actions, makeElementSymbolActionResult.revertAction]
      }));
    }
    case actionTypes.saveStyle: {
      const styleActionResult = doAction(state.data, {
        type: 'changeProp',
        property: 'style',
        value: action.data.addStyle._id,
        elementId: action.params.elementId,
        display: action.params.display
      });
      return checkOverAndSelected(Object.assign({}, state, {
        data: styleActionResult.data
      }));
    }
    case actionTypes.pbSelectElement: {
      const expandedChanges = {};
      let element = state.data[action.elementId];
      if (element) {
        while (element && element.parent) {
          element = state.data[element.parent];
          if (element && element.id !== 'body') {
            expandedChanges[element.id] = true;
          }
        }
      }
      return checkOverAndSelected(Object.assign({}, state, {
        expanded: expandedChanges,
        selectedId: action.elementId
      }));
    }
    case actionTypes.pbToggleExpandElement: {
      const isExpanded = state.expanded[action.elementId] || state.userExpanded[action.elementId];
      return Object.assign({}, state, {
        expanded: Object.assign({}, state.expanded, {
          [action.elementId]: !isExpanded
        }),
        userExpanded: Object.assign({}, state.userExpanded, {
          [action.elementId]: !isExpanded
        })
      });
    }
    case actionTypes.pbExpandAll: {
      const allExpanded = {};
      forEach(state.data, (elementIt, elementId) => {
        allExpanded[elementId] = true;
      });
      return Object.assign({}, state, {
        userExpanded: allExpanded
      });
    }
    case actionTypes.pbCollapseAll:
      return Object.assign({}, state, {
        expanded: {},
        userExpanded: {}
      });
    case actionTypes.pbToggleEditing:
      return Object.assign({}, state, {
        editing: !state.editing
      });
    case actionTypes.pbSetMenuTab:
      return Object.assign({}, state, {
        menuTab: action.value
      });
    case actionTypes.pbOpenElementsMenu:
      return Object.assign({}, state, {
        elementsMenuOpened: true,
        elementsMenuOptions: action.options
      });
    case actionTypes.pbCloseElementsMenu:
      return Object.assign({}, state, {
        elementsMenuOpened: false,
        elementsMenuOptions: null,
        elementsMenuSpot: null
      });
    case actionTypes.pbToggleCategory:
      return Object.assign({}, state, {
        categoriesCollapsed: Object.assign({}, state.categoriesCollapsed, {
          [action.category]: !state.categoriesCollapsed[action.category]
        })
      });
    case actionTypes.pbOverElement:
      return checkOverAndSelected(Object.assign({}, state, {
        overedId: action.elementId
      }));
    case actionTypes.pbOutElement:
      if (state.overedId === action.elementId) {
        return checkOverAndSelected(Object.assign({}, state, {
          overedId: null
        }));
      }
      return state;
    case actionTypes.pbLinkFormDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingFormData: true,
        linkingFormDataElementId: action.elementId,
        focusElementId: action.elementId
      }));
    case actionTypes.pbCloseLinkFormDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingFormData: false,
        linkingFormDataElementId: null,
        focusElementId: null
      }));
    case actionTypes.pbLinkDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingData: true,
        linkingDataElementId: action.elementId,
        focusElementId: action.elementId
      }));
    case actionTypes.pbCloseLinkDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingData: false,
        linkingDataElementId: null,
        focusElementId: null
      }));
    default:
      return state;
  }
}
