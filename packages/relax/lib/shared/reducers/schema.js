import actionTypes from 'actions';
import forEach from 'lodash/forEach';
import slugify from 'slug';

const defaultState = {
  step: 0,
  openedProperties: [],
  removing: false,
  saving: false,
  data: {
    type: '',
    title: '',
    publicWritable: false,
    publicReadable: true,
    properties: []
  }
};

function getUniqueId (properties, idParam, count = 0) {
  let id = idParam;
  if (id === '') {
    id = 'unnamed';
  }
  id = slugify(id).toLowerCase();

  let currentId = count === 0 ? id : `${id}-${count}`;

  // ensure unique
  forEach(properties, property => {
    if (property.id === currentId) {
      currentId = getUniqueId(properties, id, count + 1);
      return false;
    }
  });

  return currentId;
}

function findPropertyBydId (properties, id) {
  let result = false;

  forEach(properties, (property, index) => {
    if (property.id === id) {
      result = {
        property,
        index
      };
      return false;
    }
  });

  return result;
}

export default function schemaReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeSchemaToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.editSchema:
      return Object.assign({}, defaultState, {
        data: Object.assign({}, action.schema, {
          properties: [...action.schema.properties],
          template: action.schema.template && action.schema.template._id
        })
      });
    case actionTypes.changeSchemaProperty:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.property]: action.value
        })
      });
    case actionTypes.removingSchema:
      return Object.assign({}, state, {
        removing: true
      });
    case actionTypes.removedSchema:
      return Object.assign({}, state, {
        removing: false
      });
    case actionTypes.savingSchema:
      return Object.assign({}, state, {
        saving: true
      });
    case actionTypes.savedSchema:
      return Object.assign({}, state, {
        saving: false
      });
    case actionTypes.changeSchemaType:
      return Object.assign({}, state, {
        step: 1,
        data: Object.assign({}, state.data, {type: action.schemaType})
      });
    case actionTypes.changeSchemaTitle:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {title: action.title})
      });
    case actionTypes.changeSchemaPermission:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {[action.permission]: action.value})
      });
    case actionTypes.changeSchemaTemplate:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {template: action.template})
      });
    case actionTypes.templateSuccess:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {template: action.template._id})
      });
    case actionTypes.schemaStepBack:
      return Object.assign({}, state, {
        step: state.step - 1
      });
    case actionTypes.schemaStepForward:
      return Object.assign({}, state, {
        step: state.step + 1
      });
    case actionTypes.schemaAddProperty: {
      const newId = getUniqueId(state.data.properties, 'New Property');
      return Object.assign({}, state, {
        openedProperties: [...state.openedProperties, newId],
        data: Object.assign({}, state.data, {
          properties: [...state.data.properties, {
            id: newId,
            title: 'New Property',
            type: 'String',
            required: false
          }]
        })
      });
    }
    case actionTypes.schemaRemoveProperty: {
      let resultState = state;
      const propertyFound = findPropertyBydId(state.data.properties, action.id);

      if (propertyFound) {
        const properties = state.data.properties.slice(0);
        properties.splice(propertyFound.index, 1);
        resultState = Object.assign({}, state, {
          data: Object.assign({}, state.data, {
            properties
          })
        });
      }

      return resultState;
    }
    case actionTypes.schemaToggleProperty: {
      let resultState = state;
      const propertyFound = findPropertyBydId(state.data.properties, action.id);
      if (propertyFound) {
        const openedIndex = state.openedProperties.indexOf(action.id);
        if (openedIndex !== -1) {
          // remove it
          const newOpenedProperties = state.openedProperties.slice(0);
          newOpenedProperties.splice(openedIndex, 1);
          resultState = Object.assign({}, state, {
            openedProperties: newOpenedProperties
          });
        } else {
          // add it
          resultState = Object.assign({}, state, {
            openedProperties: [...state.openedProperties, action.id]
          });
        }
      }
      return resultState;
    }
    case actionTypes.schemaChangePropertySetting: {
      let resultState = state;
      const propertyFound = findPropertyBydId(state.data.properties, action.id);
      if (propertyFound) {
        const properties = state.data.properties.slice(0);
        let openedProperties = state.openedProperties;
        const changes = {
          [action.settingId]: action.value
        };

        if (action.settingId === 'title') {
          const newId = getUniqueId(state.data.properties, action.value);

          const openedIndex = openedProperties.indexOf(action.id);
          if (openedIndex !== -1) {
            openedProperties = openedProperties.slice(0);
            openedProperties[openedIndex] = newId;
          }

          changes.id = newId;
        }
        if (action.settingId === 'type') {
          changes.default = null;
          changes.props = {};
        }

        properties[propertyFound.index] = Object.assign(
          {},
          properties[propertyFound.index],
          changes
        );

        resultState = Object.assign({}, state, {
          openedProperties,
          data: Object.assign({}, state.data, {
            properties
          })
        });
      }
      return resultState;
    }
    case actionTypes.changeSchemaPropertyProp: {
      let resultState = state;
      const propertyFound = findPropertyBydId(state.data.properties, action.id);

      if (propertyFound) {
        const properties = state.data.properties.slice(0);
        const property = properties[propertyFound.index];

        properties[propertyFound.index] = Object.assign(
          {},
          property,
          {
            props: Object.assign({}, property.props, {
              [action.prop]: action.value
            })
          }
        );

        resultState = Object.assign({}, state, {
          data: Object.assign({}, state.data, {
            properties
          })
        });
      }

      return resultState;
    }
    default:
      return state;
  }
}
