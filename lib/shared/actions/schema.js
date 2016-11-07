import actionTypes from 'actions';
import {mutation} from 'relate-js';
import {push} from 'redux-router';

export function changeSchemaType (schemaType) {
  return {
    type: actionTypes.changeSchemaType,
    schemaType
  };
}

export function changeSchemaTitle (title) {
  return {
    type: actionTypes.changeSchemaTitle,
    title
  };
}

export function changeSchemaProperty (property, value) {
  return {
    type: actionTypes.changeSchemaProperty,
    property,
    value
  };
}

export function changeSchemaPermission (permission, value) {
  return {
    type: actionTypes.changeSchemaPermission,
    permission,
    value
  };
}

export function changeSchemaTemplate (template) {
  return {
    type: actionTypes.changeSchemaTemplate,
    template
  };
}

export function schemaStepBack () {
  return {
    type: actionTypes.schemaStepBack
  };
}

export function schemaStepForward () {
  return {
    type: actionTypes.schemaStepForward
  };
}

export function changeSchemaToDefault () {
  return {
    type: actionTypes.changeSchemaToDefault
  };
}

export function addProperty () {
  return {
    type: actionTypes.schemaAddProperty
  };
}

export function removeProperty (id) {
  return {
    type: actionTypes.schemaRemoveProperty,
    id
  };
}

export function toggleProperty (id) {
  return {
    type: actionTypes.schemaToggleProperty,
    id
  };
}

export function changePropertySetting (id, settingId, value) {
  return {
    type: actionTypes.schemaChangePropertySetting,
    id,
    settingId,
    value
  };
}

export function editSchema (schema) {
  return {
    type: actionTypes.editSchema,
    schema
  };
}

export function removingSchema () {
  return {
    type: actionTypes.removingSchema
  };
}

export function removedSchema () {
  return {
    type: actionTypes.removedSchema
  };
}

export function addSchema (data, redirect = true) {
  return mutation({
    fragments: {
      addSchema: {
        _id: 1,
        title: 1,
        type: 1
      }
    },
    variables: {
      addSchema: {
        data: {
          value: data,
          type: 'SchemaInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(push(`/admin/schemas/${result.addSchema.type}/${result.addSchema._id}`));
    }
  });
}

export function updateSchema (data, redirect = true) {
  return mutation({
    fragments: {
      updateSchema: {
        _id: 1,
        title: 1,
        type: 1
      }
    },
    variables: {
      updateSchema: {
        data: {
          value: data,
          type: 'SchemaInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(push(`/admin/schemas/${result.updateSchema.type}/${result.updateSchema._id}`));
    }
  });
}

export function removeSchema (schemaId, redirect = true) {
  return (dispatch, getState) => {
    removingSchema();

    return mutation({
      fragments: {
        removeSchema: {
          _id: 1
        }
      },
      variables: {
        removeSchema: {
          id: {
            value: schemaId,
            type: 'ID!'
          }
        }
      },
      type: 'REMOVE'
    }, () => {
      removedSchema();

      if (redirect) {
        dispatch(push('/admin'));
      }
    })(dispatch, getState);
  };
}
