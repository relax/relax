import actionTypes from '../client/actions/types';

const defaultState = {
  editing: true,
  dragging: false,
  selected: null,
  selectedPath: [],
  selectedParent: null,
  elements: {},
  overedElement: null,
  overedPath: [],
  redos: [],
  elementsMenuSpot: 0,
  menuTab: 'styles',
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
    default:
      return state;
  }
}
