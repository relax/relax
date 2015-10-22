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
  dragging: false,
  selected: null,
  selectedPath: [],
  selectedParent: null,
  categories,
  categoriesCollapsed,
  generalElementsMenuOpened: false,
  generalElementsMenuSearch: '',
  overedElement: null,
  overedPath: [],
  redos: [],
  elementsMenuSpot: 0,
  menuTab: 'style',
  menuSwitchSide: false,
  menuOpened: false
};

export default function pageBuilderReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.pbSetMenuOpened:
      return Object.assign({}, state, {
        menuOpened: action.value
      });
    case actionTypes.pbSetMenuSide:
      return Object.assign({}, state, {
        menuSwitchSide: action.value
      });
    case actionTypes.pbSetGeneralElementsMenuSearch:
      return Object.assign({}, state, {
        generalElementsMenuSearch: action.value
      });
    case actionTypes.pbSetGeneralElementsMenuOpened:
      return Object.assign({}, state, {
        generalElementsMenuOpened: action.value
      });
    case actionTypes.pbToggleCategory:
      return Object.assign({}, state, {
        categoriesCollapsed: Object.assign({}, state.categoriesCollapsed, {
          [action.category]: !state.categoriesCollapsed[action.category]
        })
      });
    default:
      return state;
  }
}
