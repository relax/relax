import Relate from 'relate-js';
import actionTypes from 'actions';
import elements from 'elements';
import forEach from 'lodash/forEach';

import checkOverAndSelected from './page-builder-actions/helpers/check-over-selected';
import doAction from './page-builder-actions';
import getDocFromContext from './page-builder-actions/helpers/get-doc-from-context';

const ALLOWED_TEMPLATE_ACTIONS = [
  actionTypes.pbOverElement,
  actionTypes.pbOutElement,
  actionTypes.pbSelectElement,
  actionTypes.pbToggleExpandElement,
  actionTypes.pbExpandAll,
  actionTypes.pbCollapseAll
];

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
  // references
  id: null,         // draft id
  itemId: null,     // item id
  type: null,       // item type (page || template || ...)
  template: null,   // template being used for the current item (to be able to get on layers tab)

  // builder
  doc: {},          // item document with all the properties
  actions: [],      // actions history
  redos: [],        // redos history

  // state
  state: null,      // null || loading || error || success
  stateMessage: '', // state message
  editing: true,
  elements,
  dropDraftConfirmation: false,
  pushChangesConfirmation: false,

  // elements structure
  expanded: {},
  userExpanded: {},

  // elements highlight
  selected: null,
  selectedElement: null,
  selectedParent: null,
  selectedPath: [],
  selectedIsTemplate: false,
  selectedLinks: [],
  overed: null,
  focused: null,

  // Linking data
  linkingData: null,
  linkingDataElement: null,

  // elements menu
  categories,
  categoriesCollapsed,
  elementsMenuOpened: false,
  elementsMenuOptions: {},
  elementsMenuSpot: null,

  // menu state
  menuTab: 'style',
  linkTabSchemaId: 'page',

  // symbols edit state
  symbolsEditing: [],
  symbolsData: {}
};

function updateDataFragment ({state, fragment, currentSymbolEditing}) {
  let result = state;

  if (currentSymbolEditing) {
    result = Object.assign({}, state, {
      symbolsData: Object.assign({}, state.symbolsData, {
        [currentSymbolEditing.symbolId]: fragment
      })
    });
    result = checkOverAndSelected(result, fragment.doc);
  } else {
    result = checkOverAndSelected(Object.assign({}, state, fragment));
  }

  return result;
}

export default function pageBuilderReducer (state = defaultState, action = {}) {
  const context = action.context || (action.action && action.action.context);
  const {dataFragment, doc, currentSymbolEditing, isTemplate} = getDocFromContext(state, context);

  // Template restrict actions
  if (isTemplate && ALLOWED_TEMPLATE_ACTIONS.indexOf(action.type) === -1) {
    return state;
  }

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
    case actionTypes.pbChangeState:
      return Object.assign({}, state, {
        state: action.state,
        stateMessage: action.message
      });
    case Relate.actionTypes.query:
    case Relate.actionTypes.mutation: {
      const data = action.data;
      let draftData;

      if (data.draft) {
        draftData = data.draft;
      } else if (data.restoreRevision && data.restoreRevision.draft) {
        draftData = data.restoreRevision.draft;
      } else if (data.saveDraft && data.saveDraft.draft) {
        draftData = data.saveDraft.draft; // should it?
      } else if (data.dropDraft) {
        draftData = data.dropDraft;
      }

      if (draftData) {
        const dataChange = {};

        if (draftData.doc) {
          dataChange.doc = draftData.doc;
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

        let linkTabSchemaId = 'page';
        if (state.id && state.type && state.type !== 'template') {
          if (state.type === 'page') {
            linkTabSchemaId = 'page';
          } else {
            linkTabSchemaId = state.type;
          }
        }

        return Object.assign({},
          state.id !== dataChange.id ? defaultState : state,
          dataChange,
          {
            template: state.template,
            linkTabSchemaId
          }
        );
      }
      return state;
    }
    case actionTypes.pbDoAction: {
      const actionResult = doAction(doc, action.action);

      return updateDataFragment({
        state,
        currentSymbolEditing,
        fragment: Object.assign({}, dataFragment, {
          doc: actionResult.doc,
          actions: [...dataFragment.actions, actionResult.revertAction],
          redos: []
        })
      });
    }
    case actionTypes.doActionNoHistory: {
      const actionResult = doAction(doc, action.action);

      return updateDataFragment({
        state,
        currentSymbolEditing,
        fragment: Object.assign({}, dataFragment, {
          doc: actionResult.doc,
          redos: []
        })
      });
    }
    case actionTypes.pbUndoAction: {
      if (dataFragment.actions.length > 0) {
        const actions = dataFragment.actions.slice(0);
        const undoActionResult = doAction(doc, actions.pop());
        return updateDataFragment({
          state,
          currentSymbolEditing,
          fragment: Object.assign({}, dataFragment, {
            doc: undoActionResult.doc,
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
        const redoActionResult = doAction(doc, redos.pop());
        return updateDataFragment({
          state,
          currentSymbolEditing,
          fragment: Object.assign({}, dataFragment, {
            doc: redoActionResult.doc,
            actions: [...dataFragment.actions, redoActionResult.revertAction],
            redos
          })
        });
      }
      return state;
    case actionTypes.makeElementSymbol: {
      const {elementId, symbol} = action;
      const data = doc[context];

      const elementToSymbol = data[elementId];
      const elementToSymbolParent = data[elementToSymbol.parent];
      const elementToSymbolPosition = elementToSymbolParent.children.indexOf(elementId);

      const result = doAction(doc, [
        {
          type: 'remove',
          elementId,
          context
        },
        {
          type: 'new',
          destination: {
            id: elementToSymbol.parent,
            position: elementToSymbolPosition,
            context
          },
          element: {
            tag: 'Symbol',
            props: {
              symbolId: symbol._id
            }
          }
        }
      ]);
      return updateDataFragment({
        state,
        currentSymbolEditing,
        fragment: Object.assign({}, dataFragment, {
          doc: result.doc,
          actions: [...dataFragment.actions, result.revertAction],
          redos: []
        })
      });
    }
    case actionTypes.pbSelectElement: {
      const {elementId} = action;
      let result;

      if (isTemplate) {
        result = checkOverAndSelected(Object.assign({}, state, {
          selected: elementId === 'body' ? null : {
            id: elementId,
            context
          }
        }));
      } else if (!elementId || !context) {
        result = checkOverAndSelected(Object.assign({}, state, {
          selected: null
        }));
      } else {
        const data = doc[context];

        const expandedChanges = {};
        let element = data[elementId];
        if (element && !currentSymbolEditing) {
          while (element && element.parent) {
            element = data[element.parent];

            if (element && element.id !== 'body') {
              expandedChanges[element.id] = true;
            }
          }
        }

        const newExpandedContext = Object.assign(
          {},
          state.expanded && state.expanded[context],
          expandedChanges
        );

        result = checkOverAndSelected(Object.assign({}, state, {
          expanded: Object.assign({}, state.expanded, {
            [context]: newExpandedContext
          }),
          selected: elementId === 'body' ? null : {
            id: elementId,
            context
          }
        }));
      }

      return result;
    }
    case actionTypes.pbToggleExpandElement: {
      const {elementId} = action;
      const isExpanded =
        state.expanded[context] && state.expanded[context][elementId] ||
        state.userExpanded[context] && state.userExpanded[context][elementId];

      return Object.assign({}, state, {
        expanded: Object.assign({}, state.expanded, {
          [context]: Object.assign({}, state.expanded[context], {
            [action.elementId]: !isExpanded
          })
        }),
        userExpanded: Object.assign({}, state.userExpanded, {
          [context]: Object.assign({}, state.expanded[context], {
            [action.elementId]: !isExpanded
          })
        })
      });
    }
    case actionTypes.pbExpandAll: {
      const allExpanded = {};

      forEach(state.doc, (data, contextIt) => {
        allExpanded[contextIt] = {};

        forEach(data, (element, elementId) => {
          allExpanded[contextIt][elementId] = true;
        });
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
    case actionTypes.pbSetMenuTab: {
      const changes = {
        menuTab: action.value
      };

      if (action.value === 'link') {
        const {selected, selectedElement} = state;
        const ElementClass = selectedElement && elements[selectedElement.tag];

        if (ElementClass && ElementClass.settings.dynamicLinkable) {
          changes.linkingData = selected;
          changes.focused = selected;
        }
      } else if (state.linkingData) {
        changes.selected = state.linkingData;
        changes.linkingData = null;
        changes.focused = null;
      }

      return checkOverAndSelected(
        Object.assign({}, state, changes),
        doc
      );
    }
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
    case actionTypes.pbOverElement: {
      const {elementId} = action;
      return checkOverAndSelected(Object.assign({}, state, {
        overed: {
          id: elementId,
          context
        }
      }));
    }
    case actionTypes.pbOutElement: {
      const {elementId} = action;
      if (state.overed &&
          state.overed.id === elementId &&
          state.overed.context === context) {
        return checkOverAndSelected(Object.assign({}, state, {
          overed: null
        }));
      }
      return state;
    }
    case actionTypes.pbLinkDataMode: {
      const {elementId} = action;

      return checkOverAndSelected(Object.assign({}, state, {
        linkingData: {
          id: elementId,
          context
        },
        focused: {
          id: elementId,
          context
        }
      }));
    }
    case actionTypes.pbCloseLinkDataMode:
      return checkOverAndSelected(Object.assign({}, state, {
        linkingData: null,
        linkingDataElement: null,
        focused: null
      }));
    case actionTypes.pbEditSymbol: {
      const {elementId, symbol} = action;

      return checkOverAndSelected(Object.assign({}, state, {
        focused: {
          id: elementId,
          context
        },
        symbolsEditing: [...state.symbolsEditing, {
          id: elementId,
          context,
          symbolId: symbol._id
        }],
        symbolsData: Object.assign({}, state.symbolsData, {
          [symbol._id]: {
            doc: {
              [symbol._id]: symbol.data
            },
            actions: [],
            redos: []
          }
        })
      }));
    }
    case actionTypes.pbCloseEditSymbol: {
      const symbolsEditing = state.symbolsEditing.slice(0);
      const removedId = symbolsEditing.pop();
      const nextFocused = symbolsEditing.length && symbolsEditing[symbolsEditing.length - 1];
      const symbolsData = Object.assign({}, state.symbolsData);
      delete symbolsData[removedId];

      return Object.assign({}, state, {
        focused: nextFocused,
        symbolsEditing,
        symbolsData,
        selected: null,
        selectedElement: null,
        selectedParent: null,
        selectedPath: [],
        overed: null
      });
    }
    case actionTypes.pbChangeLinkTabSchemaId:
      return Object.assign({}, state, {
        linkTabSchemaId: action.schemaId
      });
    case actionTypes.setPageBuilderTemplate:
      return Object.assign({}, state, {
        template: action.template
      });
    default:
      return state;
  }
}
