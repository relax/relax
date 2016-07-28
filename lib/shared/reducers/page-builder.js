import actionTypes from 'actions';
import elements from 'elements';
import forEach from 'lodash.foreach';
import Relate from 'relate-js';

import checkOverAndSelected from './page-builder-actions/helpers/check-over-selected';
import doAction from './page-builder-actions';

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

export const defaultState = {
  id: null,
  itemId: null,
  type: null,
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
  menuTab: 'style',
  linkTabSchemaId: 'page',
  symbolsEditing: [],
  symbolsData: {}
};

function updateDataFragment ({state, fragment, currentSymbolID}) {
  let result = state;

  if (currentSymbolID) {
    result = Object.assign({}, state, {
      symbolsData: Object.assign({}, state.symbolsData, {
        [currentSymbolID]: fragment
      })
    });
    result = checkOverAndSelected(result, fragment.data);
  } else {
    result = checkOverAndSelected(Object.assign({}, state, fragment));
  }

  return result;
}

export default function pageBuilderReducer (state = defaultState, action = {}) {
  const editingSymbol = state.symbolsEditing.length > 0;
  const currentSymbolID = editingSymbol && state.symbolsEditing[state.symbolsEditing.length - 1];
  const dataFragment = currentSymbolID ? state.symbolsData[currentSymbolID] : state;

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
        draftData = action.data.saveDraft.draft; // should it?
      } else if (action.data.dropDraft) {
        draftData = action.data.dropDraft;
      }

      if (draftData) {
        const dataChange = {};

        if (draftData.data) {
          dataChange.data = draftData.data;
        }
        if (draftData.actions) {
          dataChange.actions = draftData.actions;
        }
        if (draftData._id) {
          dataChange.id = draftData._id;
        }
        if (draftData.itemId) {
          dataChange.itemId = draftData.itemId;
        }
        if (draftData.type) {
          dataChange.type = draftData.type;
        }

        return Object.assign({},
          state.id !== dataChange.id ? defaultState : state,
          dataChange
        );
      }
      return state;
    }
    case actionTypes.pbDoAction: {
      const actionResult = doAction(dataFragment.data, action.action);

      return updateDataFragment({
        state,
        currentSymbolID,
        fragment: Object.assign({}, dataFragment, {
          data: actionResult.data,
          actions: [...dataFragment.actions, actionResult.revertAction],
          redos: []
        })
      });
    }
    case actionTypes.pbUndoAction: {
      if (dataFragment.actions.length > 0) {
        const actions = dataFragment.actions.slice(0);
        const undoActionResult = doAction(dataFragment.data, actions.pop());
        return updateDataFragment({
          state,
          currentSymbolID,
          fragment: Object.assign({}, dataFragment, {
            data: undoActionResult.data,
            actions,
            redos: [...dataFragment.redos, undoActionResult.revertAction]
          })
        });
      }
      return state;
    }
    case actionTypes.pbRedoAction:
      if (dataFragment.redos.length > 0) {
        const redos = dataFragment.redos.slice(0);
        const redoActionResult = doAction(dataFragment.data, redos.pop());
        return updateDataFragment({
          state,
          currentSymbolID,
          fragment: Object.assign({}, dataFragment, {
            data: redoActionResult.data,
            actions: [...dataFragment.actions, redoActionResult.revertAction],
            redos
          })
        });
      }
      return state;
    case actionTypes.makeElementSymbol: {
      const elementToSymbol = dataFragment.data[action.elementId];
      const elementToSymbolParent = dataFragment.data[elementToSymbol.parent];
      const elementToSymbolPosition = elementToSymbolParent.children.indexOf(action.elementId);

      const makeElementSymbolActionResult = doAction(dataFragment.data, [
        {
          type: 'remove',
          elementId: action.elementId
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
              symbolId: action.symbol._id
            }
          }
        }
      ]);
      return updateDataFragment({
        state,
        currentSymbolID,
        fragment: Object.assign({}, dataFragment, {
          data: makeElementSymbolActionResult.data,
          actions: [...dataFragment.actions, makeElementSymbolActionResult.revertAction],
          redos: []
        })
      });
    }
    case actionTypes.saveStyle: {
      const styleActionResult = doAction(dataFragment.data, {
        type: 'changeProp',
        property: 'style',
        value: action.data.addStyle._id,
        elementId: action.params.elementId,
        display: action.params.display
      });
      return updateDataFragment({
        state,
        currentSymbolID,
        fragment: Object.assign({}, dataFragment, {
          data: styleActionResult.data
        })
      });
    }
    case actionTypes.pbSelectElement: {
      const expandedChanges = {};
      let element = dataFragment.data[action.elementId];
      if (element && !editingSymbol) {
        while (element && element.parent) {
          element = dataFragment.data[element.parent];
          if (element && element.id !== 'body') {
            expandedChanges[element.id] = true;
          }
        }
      }
      return checkOverAndSelected(Object.assign({}, state, {
        expanded: expandedChanges,
        selectedId: action.elementId
      }), dataFragment.data);
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
      }), dataFragment.data);
    case actionTypes.pbOutElement:
      if (state.overedId === action.elementId) {
        return checkOverAndSelected(Object.assign({}, state, {
          overedId: null
        }), dataFragment.data);
      }
      return state;
    case actionTypes.pbLinkFormDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingFormData: true,
        linkingFormDataElementId: action.elementId,
        focusElementId: action.elementId
      }), dataFragment.data);
    case actionTypes.pbCloseLinkFormDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingFormData: false,
        linkingFormDataElementId: null,
        focusElementId: null
      }), dataFragment.data);
    case actionTypes.pbLinkDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingData: true,
        linkingDataElementId: action.elementId,
        focusElementId: action.elementId
      }), dataFragment.data);
    case actionTypes.pbCloseLinkDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingData: false,
        linkingDataElementId: null,
        focusElementId: null
      }), dataFragment.data);
    case actionTypes.pbEditSymbol:
      return checkOverAndSelected(Object.assign({}, state, {
        focusElementId: action.elementId,
        symbolsEditing: [...state.symbolsEditing, action.elementId],
        symbolsData: Object.assign({}, state.symbolsData, {
          [action.elementId]: {
            data: action.data,
            actions: [],
            redos: []
          }
        })
      }), dataFragment.data);
    case actionTypes.pbCloseEditSymbol: {
      const symbolsEditing = state.symbolsEditing.slice(0);
      const removedId = symbolsEditing.pop();
      const nextFocused = symbolsEditing.length && symbolsEditing[symbolsEditing.length - 1];
      const symbolsData = Object.assign({}, state.symbolsData);
      delete symbolsData[removedId];

      return Object.assign({}, state, {
        focusElementId: nextFocused,
        symbolsEditing,
        symbolsData,
        selectedId: null,
        selectedElement: null,
        selectedParent: null,
        selectedPath: [],
        overedId: null
      });
    }
    case actionTypes.pbChangeLinkTabSchemaId:
      return Object.assign({}, state, {
        linkTabSchemaId: action.schemaId
      });
    default:
      return state;
  }
}
