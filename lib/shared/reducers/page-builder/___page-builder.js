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
  restored: false,  // flag if draft was restored from revision

  // state
  state: null,      // null || loading || error || success
  stateMessage: '', // state message
  editing: true,
  dropDraftConfirmation: false,
  pushChangesConfirmation: false,
  unpublishConfirmation: false,

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




    default:
      return state;
  }
}
