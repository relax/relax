import actionTypes from 'actions';
import forEach from 'lodash.foreach';

// Default state
// state will be composed of DB data and connectors data e.g
// {
//   56d0583eb0dc646f07b05cf2: {},
//   568fc7d152e76bc604a74520: {},
//   connector_1: {
//     pages: ['56d0583eb0dc646f07b05cf2', '568fc7d152e76bc604a74520']
//   }
// }
const defaultState = {};

// Connectors might listen to custom graphQL mutations
// e.g
// {
//   connector_1: {
//     pages: {
//       addPage: 'prepend'
//     }
//   }
// }
const connectorsListeners = {};

export default function graphqlReducer (state = defaultState, action = {}) {
  if (action.type === actionTypes.graphql && action.data) {
    // action.data should have a set of actions specified in map
    const changes = {};

    forEach(action.data, (data, graphAction) => {
      let connectorData;

      // Add new data
      if (data.constructor === Array) { // multiple entries query or mutation
        connectorData = [];
        forEach(data, (entryData, index) => {
          const ID = entryData._id;
          Object.assign(changes, {
            [ID]: Object.assign({}, state[ID] || {}, changes[ID] || {}, entryData)
          });
          connectorData.push(ID);
        });
      } else { // single entry query or mutation
        const ID = data._id;
        Object.assign(changes, {
          [ID]: Object.assign({}, state[ID] || {}, changes[ID] || {}, data)
        });
        connectorData = ID;
      }

      // Save data map for connectors
      const connectors = action.params && action.params.connectors;
      if (connectors) {
        forEach(connectors, (connectorQuery, connectorId) => {
          // check if current graphql action was triggered by the current connector
          if (connectorQuery.fragments[graphAction]) {
            Object.assign(changes, {
              [connectorId]: Object.assign({}, state[connectorId] || {}, changes[connectorId] || {}, {
                [graphAction]: connectorData
              })
            });
          }
          // Add info to connectorsListeners if appliable
          if (connectorQuery.mutations) {
            connectorsListeners[connectorId] = connectorQuery.mutations;
          }
        });
      } else {
        // Is a mutation
        forEach(connectorsListeners, (queries, connectorId) => {
          forEach(queries, (mutations, queryName) => {
            if (mutations[graphAction]) {
              const connectorMutationAction = mutations[graphAction];
              const connectorQueryData = state[connectorId][queryName];
              const arrayConnectorData = connectorData.constructor === Array ? connectorData : [connectorData];

              if (connectorMutationAction === 'prepend') {
                Object.assign(changes, {
                  [connectorId]: Object.assign({}, state[connectorId] || {}, changes[connectorId] || {}, {
                    [queryName]: [...arrayConnectorData, ...connectorQueryData]
                  })
                });
              } else if (connectorMutationAction === 'append') {
                Object.assign(changes, {
                  [connectorId]: Object.assign({}, state[connectorId] || {}, changes[connectorId] || {}, {
                    [queryName]: [...connectorQueryData, ...arrayConnectorData]
                  })
                });
              }
            }
          });
        });
      }
    });

    return Object.assign({}, state, changes);
  }

  if (action.type === actionTypes.removeConnector) {
    const newState = Object.assign({}, state);
    delete newState[action.id];
    connectorsListeners[action.id] && delete connectorsListeners[action.id];
    // TODO Delete no longer needed data from state?
    return newState;
  }

  return state;
}
