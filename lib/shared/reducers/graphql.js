import actionTypes from 'actions';
import forEach from 'lodash.foreach';

// Calculate data tree from config
const defaultState = {};

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
        });
      }
    });

    return Object.assign({}, state, changes);
  }

  return state;
}
