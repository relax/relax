import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    data: {}
  },
  errors: null
};

var ID_COUNTER = 0;
function getLastId (data) {
  while (data[ID_COUNTER]) {
    ID_COUNTER++;
  }

  return '' + ID_COUNTER++;
}

function cloneChildren (children, data, changes) {
  const resultChildren = [];

  forEach(children, (childId) => {
    const newId = getLastId(data);
    const element = data[childId];
    const clonedChild = cloneDeep(element);
    clonedChild.id = newId;
    if (clonedChild.children) {
      clonedChild.children = cloneChildren(clonedChild.children, data, changes);
    }
    changes[newId] = clonedChild;
    resultChildren.push(newId);
  });

  return resultChildren;
}

function doAction (data, action) {
  const changes = {};

  if (action.type === 'new' || action.type === 'move' || action.type === 'add' || action.type === 'duplicate') {
    let destinationId;
    let destinationPosition;
    let sourceId;

    // Source
    if (action.type === 'new') {
      destinationId = action.destination.id;
      destinationPosition = action.destination.position;
      sourceId = getLastId(data);
      changes[sourceId] = {
        parent: destinationId,
        id: sourceId,
        ...action.element
      };
    } else if (action.type === 'move') {
      destinationId = action.destination.id;
      destinationPosition = action.destination.position;
      sourceId = action.source.id;
      const sourceElement = data[sourceId];

      // remove from old parent children
      const parentElement = data[sourceElement.parent];
      const parentChildren = parentElement.children.slice(0);
      const oldPosition = parentElement.children.indexOf(sourceId);
      parentChildren.splice(oldPosition, 1);
      changes[parentElement.id] = Object.assign({}, parentElement, {
        children: parentChildren
      });

      if (sourceElement.parent !== destinationId) {
        changes[sourceId] = Object.assign({}, sourceElement, {
          parent: destinationId
        });
      } else if (oldPosition < destinationPosition) {
        destinationPosition--;
      }
    } else if (action.type === 'duplicate') {
      sourceId = getLastId(data);

      const toDuplicate = data[action.elementId];
      destinationId = toDuplicate.parent;
      destinationPosition = data[toDuplicate.parent].children.indexOf(toDuplicate.id) + 1;

      const cloned = cloneDeep(toDuplicate);
      cloned.id = sourceId;
      if (cloned.children) {
        cloned.children = cloneChildren(cloned.children, data, changes);
      }
      changes[sourceId] = cloned;
    }

    // Destination
    if (!data[destinationId] && destinationId === 'body') {
      changes.body = {
        id: 'body',
        tag: 'body',
        children: [sourceId]
      };
    } else {
      const children = changes[destinationId] && changes[destinationId].children || data[destinationId].children && data[destinationId].children.slice(0) || [];
      children.splice(destinationPosition, 0, sourceId);
      changes[destinationId] = Object.assign({}, data[destinationId], {
        children
      });
    }
  }

  return Object.assign({}, data, changes);
}

export default function draftReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.getAdmin:
      if (action.data.draft) {
        return Object.assign({}, state, {
          data: action.data.draft,
          errors: action.errors
        });
      }
      return state;
    case actionTypes.pbDoAction:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          data: doAction(state.data.data, action.action)
        })
      });
    default:
      return state;
  }
}
