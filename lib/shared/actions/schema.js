import actionTypes from 'actions';
import request from 'helpers/request';
import stringifyFields from 'helpers/stringify-fields';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';
import {fragmentToQL} from 'relax-fragments';

const stringifiableFields = ['properties', 'data'];

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
          value: stringifyFields(data, stringifiableFields),
          type: 'SchemaInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, `/admin/schemas/${result.addSchema._id}`));
    }
  });
}


export function updateSchema (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.updateSchema,
      query: `
        mutation updateSchema ($data: SchemaInput!) {
          updateSchema (data: $data) {
            ${fragmentToQL(fragments.schema)}
          }
        }
      `,
      variables: {
        data: stringifyFields(data, stringifiableFields)
      }
    })
  );
}

export function restoreSchema (fragments, schemaId, version) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.restoreSchema,
      query: `
        mutation restoreSchema ($schemaId: ID!, $version: Int!) {
          restoreSchema (schemaId: $schemaId, version: $version) {
            ${fragmentToQL(fragments.schema)}
          }
        }
      `,
      variables: {
        schemaId,
        version
      }
    })
  );
}

export function validateSchemaSlug ({slug, schemaId}) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.validateSchemaSlug,
      query: `
        query validateSchemaSlug ($slug: String!, $schemaId: ID) {
          validateSchemaSlug (slug: $slug, schemaId: $schemaId)
        }
      `,
      variables: {
        slug,
        schemaId
      }
    })
  );
}
