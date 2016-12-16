import actionTypes from 'actions';
import {categories, categoriesCollapsed} from 'helpers/page-builder/categories';

import actions from './actions';
import checkSelection from './check-selection';
import elementsMenu from './elements-menu';
import fragments from './fragments';
import menu from './menu';
import selection from './selection';
import states from './states';

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
  restored: false,  // flag if draft was restored from revision

  // builder
  fragments: {},    // documents scoped by "draft" || "template" || SYMBOL_ID

  // overall states
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
  symbolsEditing: []
};

export default function pageBuilderReducer (state = defaultState, action = {}) {
  let newState = state;

  // Template restrict actions
  const actionContext = action.context || action.action && action.action.context;
  const isTemplate = actionContext && actionContext.doc === 'template';
  if (isTemplate && ALLOWED_TEMPLATE_ACTIONS.indexOf(action.type) === -1) {
    return state;
  }

  // page actions
  newState = actions(newState, action, defaultState);

  // overall states actions
  newState = states(newState, action, defaultState);

  // data actions
  newState = fragments(newState, action, defaultState);

  // selection actions
  newState = selection(newState, action, defaultState);

  // menu actions
  newState = menu(newState, action, defaultState);

  // elements menu actions
  newState = elementsMenu(newState, action, defaultState);

  if (newState !== state) {
    // check if selected and overed elements are valid within rules
    newState = checkSelection(newState, action, defaultState);
  }

  return newState;
}
