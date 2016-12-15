import actions from './actions';
import checkSelection from './check-selection';
import data from './data';
import elementsMenu from './elements-menu';
import menu from './menu';
import selection from './selection';
import states from './states';
import symbols from './symbols';
import {categories, categoriesCollapsed} from './helpers/categories';

export const defaultState = {
  // references
  id: null,         // draft id
  itemId: null,     // item id
  type: null,       // item type (page || template || ...)
  template: null,   // template being used for the current item (to be able to get on layers tab)

  // builder
  docs: {},          // documents scoped by "draft" || "template" || SYMBOL_ID
  actions: [],      // actions history
  redos: [],        // redos history
  restored: false,  // flag if draft was restored from revision

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

  // TODO limit template actions

  // page actions
  newState = actions(newState, action, defaultState);

  // overall states actions
  newState = states(newState, action, defaultState);

  // data actions
  newState = data(newState, action, defaultState);

  // selection actions
  newState = selection(newState, action, defaultState);

  // menu actions
  newState = menu(newState, action, defaultState);

  // elements menu actions
  newState = elementsMenu(newState, action, defaultState);

  // symbols actions
  newState = symbols(newState, action, defaultState);

  if (newState !== state) {
    // check if selected and overed elements are valid within rules
    newState = checkSelection(newState, action, defaultState);
  }

  return newState;
}
