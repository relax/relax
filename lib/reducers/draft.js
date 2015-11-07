import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';

import actionTypes from '../client/actions/types';
import elements from '../components/elements';

const defaultState = {
  data: {
    data: {},
    actions: []
  },
  redos: [],
  expanded: {}, // for structure layer
  userExpanded: {}, // for structure layer
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

      if (elements[action.element.tag].defaultChildren) {
        const defaultChildren = elements[action.element.tag].defaultChildren;
        if (defaultChildren.constructor === Array) {
          forEach(defaultChildren, (child) => {
            const childId = getLastId(data);
            changes[childId] = Object.assign({}, child, {
              parent: sourceId,
              id: childId
            });
            changes[sourceId].children = changes[sourceId].children || [];
            changes[sourceId].children.push(childId);
          });
        }
      }

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
      if (cloned.children && cloned.children.constructor === Array) {
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
    if (element.children && element.children.constructor === Array) {
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
    let previousValue;
    let changedElement;
    if (action.property === 'children') {
      previousValue = element.children || '';
      changedElement = Object.assign({}, element, {
        children: action.value,
        props: Object.assign({}, element.props || {}, {
          [action.property]: action.value
        })
      });
    } else {
      previousValue = element.props && element.props[action.property];
      changedElement = Object.assign({}, element, {
        props: Object.assign({}, element.props || {}, {
          [action.property]: action.value
        })
      });
    }

    revertAction = Object.assign({}, action, {
      value: previousValue
    });
    resultData = Object.assign({}, data, {
      [action.elementId]: changedElement
    });
  } else if (action.type === 'changeAnimation') {
    const defaults = {
      use: false,
      effect: 'transition.fadeIn',
      duration: 400,
      delay: 300
    };
    const element = data[action.elementId];
    const previousValue = element.animation && element.animation[action.property];
    const changedElement = Object.assign({}, element, {
      animation: Object.assign({}, element.animation || defaults, {
        [action.property]: action.value
      })
    });

    revertAction = Object.assign({}, action, {
      value: previousValue
    });
    resultData = Object.assign({}, data, {
      [action.elementId]: changedElement
    });
  } else if (action.type === 'changeStyle') {
    const element = data[action.elementId];
    const previousValue = element.style && element.style[action.property];
    const changedElement = Object.assign({}, element, {
      style: Object.assign({}, element.style || {}, {
        [action.property]: action.value
      })
    });

    if (action.value === null || typeof action.value === 'undefined') {
      delete changedElement.style[action.property];
    }

    revertAction = Object.assign({}, action, {
      value: previousValue
    });
    resultData = Object.assign({}, data, {
      [action.elementId]: changedElement
    });
  } else if (action.type === 'changeContent') {
    const element = data[action.elementId];
    const previousValue = element.children || '';
    const changedElement = Object.assign({}, element, {
      children: action.value
    });

    revertAction = Object.assign({}, action, {
      value: previousValue
    });
    resultData = Object.assign({}, data, {
      [action.elementId]: changedElement
    });
  } else if (action.type === 'changeChildren') { // one level chilren only allowed
    const element = data[action.elementId];
    const previousChildren = [];
    const newData = Object.assign({}, data);
    if (element.children && element.children.constructor === Array) {
      forEach(element.children, (child) => {
        previousChildren.push(Object.assign({}, data[child.id]));
        delete newData[child.id];
      });
    }
    const changes = {};
    const newChildren = [];
    forEach(action.children, (child) => {
      const childId = getLastId(data);
      newChildren.push(childId);
      const newChild = Object.assign({}, child, {
        id: childId,
        parent: element.id
      });
      changes[childId] = newChild;
    });
    changes[element.id] = Object.assign({}, element, {
      children: newChildren
    });

    revertAction = Object.assign({}, action, {
      children: previousChildren
    });
    resultData = Object.assign(newData, changes);
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
        const data = Object.assign({}, action.data.draft, {
          data: JSON.parse(action.data.draft.data),
          actions: JSON.parse(action.data.draft.actions)
        });
        return Object.assign({}, state, {
          data,
          redos: [],
          opened: {},
          errors: action.errors
        });
      }
      return state;
    case actionTypes.savePageFromDraft:
      const updateDraftData = Object.assign({}, action.data.updateDraft, {
        data: JSON.parse(action.data.updateDraft.data),
        actions: JSON.parse(action.data.updateDraft.actions)
      });
      return Object.assign({}, state, {
        data: updateDraftData || state.data,
        errors: action.errors
      });
    case actionTypes.dropDraft:
      const dropDraftData = Object.assign({}, action.data.dropDraft, {
        data: JSON.parse(action.data.dropDraft.data),
        actions: JSON.parse(action.data.dropDraft.actions)
      });
      return Object.assign({}, state, {
        data: dropDraftData || state.data,
        errors: action.errors
      });
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
    case actionTypes.saveStyle:
      const styleActionResult = doAction(state.data.data, {
        type: 'changeProp',
        property: 'style',
        value: action.data.addStyle._id,
        elementId: action.params.elementId
      });
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          data: styleActionResult.data
        })
      });
    case actionTypes.pbSelectElement:
      const expandedChanges = {};
      let element = state.data.data[action.elementId];
      if (element) {
        while (element && element.parent) {
          element = state.data.data[element.parent];
          if (element && element.id !== 'body') {
            expandedChanges[element.id] = true;
          }
        }
      }
      return Object.assign({}, state, {
        expanded: expandedChanges
      });
    case actionTypes.pbToggleExpandElement:
      const isExpanded = state.expanded[action.elementId] || state.userExpanded[action.elementId];
      return Object.assign({}, state, {
        expanded: Object.assign({}, state.expanded, {
          [action.elementId]: !isExpanded
        }),
        userExpanded: Object.assign({}, state.userExpanded, {
          [action.elementId]: !isExpanded
        })
      });
    case actionTypes.pbExpandAll:
      const allExpanded = {};
      forEach(state.data.data, (elementIt, elementId) => {
        allExpanded[elementId] = true;
      });
      return Object.assign({}, state, {
        userExpanded: allExpanded
      });
    case actionTypes.pbCollapseAll:
      return Object.assign({}, state, {
        expanded: {},
        userExpanded: {}
      });
    default:
      return state;
  }
}
