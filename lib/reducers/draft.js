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

function doAction (data, action) {
  const changes = {};

  if (action.type === 'new' || action.type === 'move' || action.type === 'add') {
    const destinationId = action.destination.id;
    let destinationPosition = action.destination.position;
    let sourceId;

    // Source
    if (action.type === 'new') {
      sourceId = getLastId(data);
      changes[sourceId] = {
        parent: destinationId,
        id: sourceId,
        ...action.element
      };
    } else if (action.type === 'move') {
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
