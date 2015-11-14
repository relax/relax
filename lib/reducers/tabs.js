import filter from 'lodash.filter';
import find from 'lodash.find';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: [],
  errors: null
};

export default function tabsReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.tabs) {
        const tabs = action.data.tabs.slice(0);
        if (action.data.tab) {
          const exist = find(tabs, (tab) => {
            return tab._id._id === action.data.tab._id._id;
          });
          if (!exist) {
            tabs.push(Object.assign({}, action.data.tab, {selected: true}));
          } else {
            exist.selected = true;
          }
        }
        return Object.assign({}, state, {
          data: tabs,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.removeTab:
      return Object.assign({}, state, {
        data: filter(state.data, (tabIt) => (
          tabIt._id._id !== action.data.removeTab._id._id
        )),
        errors: action.errors
      });
    case actionTypes.removePage:
      return Object.assign({}, state, {
        data: filter(state.data, (tab) => (
          tab.page._id !== action.data.removePage._id
        )),
        errors: action.errors
      });
    default:
      return state;
  }
}
