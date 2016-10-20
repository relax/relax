import Relate from 'relate-js';
import actionTypes from 'actions';
import forEach from 'lodash.foreach';

export const defaultState = {};

let ID = 0;
export function getLastId (data) {
  while (data[ID]) {
    ID++;
  }
  return (ID++).toString();
}

function cleanUpChildren (data, children) {
  forEach(children, (child) => {
    if (child.children) {
      cleanUpChildren(data, child.children);
    }

    delete data[child.id];
  });
}

export default function menuReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case Relate.actionTypes.query:
      if (action.data.menu && action.data.menu.data) {
        return action.data.menu.data;
      }
      return state;
    case actionTypes.addMenuItem: { // new menu item
      const destId = action.destination.id;
      const destPos = action.destination.position;
      const id = getLastId(state);
      const changes = {
        [id]: Object.assign({id, parent: destId}, action.item)
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
    case actionTypes.removeMenuItem: {
      const {id} = action;
      const element = state[id];
      const newState = Object.assign({}, state);

      // remove children
      if (element.children) {
        cleanUpChildren(newState, element.children);
      }

      // remove from parent children
      const parent = state[element.parent];
      const parentChildren = parent.children.slice(0);
      const index = parentChildren.indexOf(id);
      parentChildren.splice(index, 1);

      newState[element.parent] = Object.assign({}, parent, {
        children: parentChildren
      });

      // remove
      delete newState[id];

      return newState;
    }
    case actionTypes.moveMenuItem: {
      const destId = action.destination.id;
      let destPos = action.destination.position;
      const sourceId = action.id;
      const sourceElement = state[sourceId];

      // remove element from current position
      const parentElement = state[sourceElement.parent];
      const parentChildren = parentElement.children.slice(0);
      const oldPosition = parentElement.children.indexOf(sourceId);
      parentChildren.splice(oldPosition, 1);
      const changes = {
        [parentElement.id]: Object.assign({}, parentElement, {
          children: parentChildren
        })
      };

      // change source parent value
      if (sourceElement.parent !== destId) {
        changes[sourceId] = Object.assign({}, sourceElement, {
          parent: destId
        });
      } else if (oldPosition < destPos) {
        destPos--;
      }

      // change destination
      const children =
        changes[destId] && changes[destId].children ||
        state[destId].children && state[destId].children.slice(0) ||
        [];
      children.splice(destPos, 0, sourceId);
      changes[destId] = Object.assign({}, changes[destId] || state[destId], {
        children
      });

      return Object.assign({}, state, changes);
    }
    default:
      return state;
  }
}
