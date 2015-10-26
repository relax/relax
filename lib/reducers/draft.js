import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';

const defaultState = {
  data: {
    data: {},
    actions: []
  },
  redos: [],
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

function removeChildren (children, copiedData) {
  const childrenElements = {};
  forEach(children, (childId) => {
    const element = copiedData[childId];
    childrenElements[element.id] = Object.assign({}, element);
    if (element.children) {
      Object.assign(childrenElements, removeChildren(element.children, copiedData));
    }
    delete copiedData[childId];
  });
  return childrenElements;
}

function doAction (data, action) {
  let resultData = data;
  let revertAction;

  if (action.type === 'new' || action.type === 'move' || action.type === 'add' || action.type === 'duplicate') {
    const changes = {};
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
      revertAction = {
        type: 'remove',
        elementId: sourceId
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
      revertAction = {
        type: 'move',
        source: {
          id: action.source.id
        },
        destination: {
          id: sourceElement.parent,
          position: oldPosition
        }
      };
    } else if (action.type === 'add') {
      destinationId = action.destination.id;
      destinationPosition = action.destination.position;
      sourceId = action.element.id || getLastId(data);
      changes[sourceId] = Object.assign({
        id: sourceId,
        parent: destinationId
      }, action.element);

      if (action.childrenElements) {
        forEach(action.childrenElements, (childElement) => {
          changes[childElement.id] = Object.assign({}, childElement);
        });
      }
      revertAction = {
        type: 'remove',
        elementId: sourceId
      };
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
      revertAction = {
        type: 'remove',
        elementId: sourceId
      };
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
    resultData = Object.assign({}, data, changes);
  } else if (action.type === 'remove') {
    const element = data[action.elementId];
    const parentChildren = data[element.parent].children.slice(0);
    const positionInParent = parentChildren.indexOf(element.id);
    parentChildren.splice(positionInParent, 1);

    const copiedData = Object.assign({}, data, {
      [element.parent]: Object.assign({}, data[element.parent], {
        children: parentChildren
      })
    });

    let childrenElements = null; // For revert action
    if (element.children) {
      childrenElements = removeChildren(element.children, copiedData);
    }

    revertAction = {
      type: 'add',
      element: copiedData[action.elementId],
      childrenElements,
      destination: {
        id: element.parent,
        position: positionInParent
      }
    };

    delete copiedData[action.elementId];
    resultData = copiedData;
  } else if (action.type === 'changeDisplay') {
    const element = data[action.elementId];
    const previousValue = element.hide && element.hide[action.display] ? true : false;
    const changedElement = Object.assign({}, element, {
      hide: Object.assign({}, element.hide || {}, {
        [action.display]: !previousValue
      })
    });

    revertAction = Object.assign({}, action);
    resultData = Object.assign({}, data, {
      [action.elementId]: changedElement
    });
  } else if (action.type === 'changeLabel') {
    const element = data[action.elementId];
    const previousValue = element.label || element.tag;
    revertAction = Object.assign({}, action, {
      value: previousValue
    });
    resultData = Object.assign({}, data, {
      [action.elementId]: Object.assign({}, element, {
        label: action.value
      })
    });
  } else if (action.type === 'changeProp') {
    const element = data[action.elementId];
    const previousValue = element.props && element.props[action.property];
    const changedElement = Object.assign({}, element, {
      props: Object.assign({}, element.props || {}, {
        [action.property]: action.value
      })
    });

    revertAction = Object.assign({}, action, {
      value: previousValue
    });
    resultData = Object.assign({}, data, {
      [action.elementId]: changedElement
    });
  }

  return {
    data: resultData,
    revertAction
  };
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
      const actionResult = doAction(state.data.data, action.action);
      return Object.assign({}, state, {
        redos: [],
        data: Object.assign({}, state.data, {
          data: actionResult.data,
          actions: [...state.data.actions, actionResult.revertAction]
        })
      });
    case actionTypes.pbUndoAction:
      if (state.data.actions.length > 0) {
        const actions = state.data.actions.slice(0);
        const undoActionResult = doAction(state.data.data, actions.pop());
        return Object.assign({}, state, {
          redos: [...state.redos, undoActionResult.revertAction],
          data: Object.assign({}, state.data, {
            data: undoActionResult.data,
            actions
          })
        });
      }
      return state;
    case actionTypes.pbRedoAction:
      if (state.redos.length > 0) {
        const redos = state.redos.slice(0);
        const redoActionResult = doAction(state.data.data, redos.pop());
        return Object.assign({}, state, {
          redos,
          data: Object.assign({}, state.data, {
            data: redoActionResult.data,
            actions: [...state.data.actions, redoActionResult.revertAction]
          })
        });
      }
      return state;
    default:
      return state;
  }
}
