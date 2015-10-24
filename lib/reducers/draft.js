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

  return ID_COUNTER++;
}

function doAction (data, action) {
  switch (action.type) {
    case 'new':
      const changes = {};

      // New
      const newId = getLastId(data);
      changes[newId] = {
        ...action.element,
        parent: action.destination.id
      };

      // Destination
      const destinationId = action.destination.id;
      const destinationPosition = action.destination.position;
      if (!data[destinationId] && destinationId === 'body') {
        changes.body = {
          children: [newId]
        };
      } else {
        const children = data[destinationId].children && data[destinationId].children.slice(0) || [];
        children.splice(destinationPosition, 0, newId);
        changes[destinationId] = Object.assign({}, data[destinationId], {
          children
        });
      }

      return Object.assign({}, data, changes);
    default:
      return data;
  }
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
