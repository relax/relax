import actionTypes from 'actions';
import Relate from 'relate-js';

const defaultState = {};

let ID = 0;
export default function getLastId (data) {
  while (data[ID]) {
    ID++;
  }
  return (ID++).toString();
}

export default function menuReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case Relate.actionTypes.query:
      if (action.data.menu && action.data.menu.data) {
        return JSON.parse(action.data.menu.data);
      }
      return state;
    case actionTypes.addMenuItem: { // new menu item
      const destId = action.destination.id;
      const destPos = action.destination.position;
      const id = getLastId(state);
      const changes = {
        [id]: Object.assign({id}, action.item)
      };

      if (!state[destId] && destId === 'root') {
        // create root
        changes.root = {
          id: 'root',
          children: [id]
        };
      } else {
        const children = state[destId] && state[destId].children || [];
        children.splice(destPos, 0, id);
        changes[destId] = Object.assign({}, state[destId], {
          children
        });
      }

      return Object.assign({}, state, changes);
    }
    default:
      return state;
  }
}
