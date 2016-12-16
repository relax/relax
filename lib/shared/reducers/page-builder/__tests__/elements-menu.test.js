import actionTypes from 'actions';

import elementsMenuReducer from '../elements-menu';
import {defaultState} from '../index';

describe('Page builder elements menu actions', () => {
  it('handles PB_OPEN_ELEMENTS_MENU', () => {
    const newState = elementsMenuReducer(defaultState, {
      type: actionTypes.pbOpenElementsMenu,
      options: {
        someOption: 1
      }
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.elementsMenuOpened).toBe(true);
    expect(newState.elementsMenuOptions).toEqual({
      someOption: 1
    });
  });

  it('handles PB_CLOSE_ELEMENTS_MENU', () => {
    const iniState = Object.assign({}, defaultState, {
      elementsMenuOpened: true,
      elementsMenuOptions: {},
      elementsMenuSpot: 0
    });
    const newState = elementsMenuReducer(iniState, {
      type: actionTypes.pbCloseElementsMenu
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.elementsMenuOpened).toBe(false);
    expect(newState.elementsMenuOptions).toBe(null);
    expect(newState.elementsMenuSpot).toBe(null);
  });

  it('handles PB_TOGGLE_CATEGORY', () => {
    const newState = elementsMenuReducer(defaultState, {
      type: actionTypes.pbToggleCategory,
      category: 'some'
    });

    expect(newState).toBeInstanceOf(Object);
    expect(newState.categoriesCollapsed.some).toBe(true);
  });
});
