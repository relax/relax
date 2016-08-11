import actionTypes from 'actions';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';

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
      dispatch(pushState(null, `/admin/schemas/${result.addSchema.type}/${result.addSchema._id}`));
    }
  });
}
