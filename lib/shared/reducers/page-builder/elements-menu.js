import actionTypes from 'actions';

export default (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
