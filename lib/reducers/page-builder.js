import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';
import elements from '../components/elements';

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
forEach(categories, (category) => categoriesCollapsed[category] = false);

const defaultState = {
  editing: true,
  linkingData: false,
  linkingDataElementId: null,
  categories,
  categoriesCollapsed,
  generalElementsMenuOpened: false,
  generalElementsMenuSearch: '',
  elementsMenuOpened: false,
  elementsMenuOptions: {},
  elementsMenuSpot: null,
  selectedId: null,
  overedId: null,
  redos: [],
  menuTab: 'style',
  menuSwitchSide: false,
  menuOpened: false
};

export default function pageBuilderReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.pbToggleEditing:
      return Object.assign({}, state, {
        editing: !state.editing
      });
    case actionTypes.pbSetMenuOpened:
      return Object.assign({}, state, {
        menuOpened: action.value
      });
    case actionTypes.pbSetMenuSide:
      return Object.assign({}, state, {
        menuSwitchSide: action.value
      });
    case actionTypes.startDragging:
      return Object.assign({}, state, {
        generalElementsMenuOpened: false
      });
    case actionTypes.pbSetMenuTab:
      return Object.assign({}, state, {
        menuTab: action.value
      });
    case actionTypes.pbSetGeneralElementsMenuSearch:
      return Object.assign({}, state, {
        generalElementsMenuSearch: action.value
      });
    case actionTypes.pbSetGeneralElementsMenuOpened:
      return Object.assign({}, state, {
        generalElementsMenuOpened: action.value
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
      return Object.assign({}, state, {
        overedId: action.elementId
      });
    case actionTypes.pbOutElement:
      if (state.overedId === action.elementId) {
        return Object.assign({}, state, {
          overedId: null
        });
      }
      return state;
    case actionTypes.pbSelectElement:
      return Object.assign({}, state, {
        selectedId: action.elementId
      });
    case actionTypes.pbDoAction:
      if (action.action.type === 'remove') {
        return Object.assign({}, state, {
          selectedId: null
        });
      }
      return state;
    case actionTypes.pbLinkDataMode:
      return Object.assign({}, state, {
        linkingData: true,
        linkingDataElementId: action.elementId,
        focusElementId: action.elementId
      });
    case actionTypes.pbCloseLinkDataMode:
      return Object.assign({}, state, {
        linkingData: false,
        linkingDataElementId: null,
        focusElementId: null
      });
    default:
      return state;
  }
}
