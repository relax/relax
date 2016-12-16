import Relate from 'relate-js';
import actionTypes from 'actions';

import menuReducer, {defaultState} from '../menu';

describe('Menu Reducer', () => {
  it('should return the initial state', () => {
    expect(menuReducer(defaultState, {})).toBe(defaultState);
  });

  it('should handle relate query', () => {
    const action = {
      type: Relate.actionTypes.query,
      data: {menu: {}}
    };
    expect(menuReducer(defaultState, action)).toBeInstanceOf(Object);
    action.data.menu.data = 'The Data';
    expect(menuReducer(defaultState, action)).toBe('The Data');
  });

  it('should handle ADD_MENU_ITEM', () => {
    const action = {
      type: actionTypes.addMenuItem,
      destination: {
        id: 1,
        position: 'Top'
      },
      item: {
        id: 2,
        parent: 1
      }
    };

    expect(menuReducer(defaultState, action)).toBeInstanceOf(Object);
  });

  it('should handle MOVE_MENU_ITEM', () => {
    const localState = defaultState;
    localState[0] = {
      id: 2,
      parent: 1
    };
    // const action = {
    //   id: 0,
    //   type: actionTypes.moveMenuItem,
    //   destination: {
    //     id: 1,
    //     position: 'Top'
    //   }
    // };

    //  expect(menuReducer(localState, action)).toBeInstanceOf(Object);
  });
});
