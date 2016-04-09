import actionTypes from 'actions';
import request from 'helpers/request';
import stringifyFields from 'helpers/stringify-fields';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';
import {fragmentToQL} from 'relax-fragments';

const stringifiableFields = ['properties', 'data'];

export function addSchemaEntry (schemaId, data, redirect = false) {
  return mutation({
    fragments: {
      addSchemaEntry: {
        _id: 1,
        title: 1,
        state: 1,
        slug: 1,
        date: 1,
        updatedDate: 1
      }
    },
    variables: {
      addSchemaEntry: {
        schemaId: {
          value: schemaId,
          type: 'ID!'
        },
        data: {
          value: data,
          type: 'SchemaEntryInput!'
        }
      }
    }
  }, (result, dispatch) => {
    if (redirect) {
      dispatch(pushState(null, `/admin/schemas/${schemaId}/${result.addSchemaEntry._id}`));
    }
  });
}

export function updateSchemaEntry (fragments, schemaId, data) {
  return (dispatch) => request({
    dispatch,
    type: actionTypes.updateSchemaEntry,
    query: `
      mutation updateSchemaEntry ($schemaId: ID!, $data: SchemaEntryInput!) {
        updateSchemaEntry (schemaId: $schemaId, data: $data) {
          ${fragmentToQL(fragments.schemaEntry)}
        }
      }
    `,
    variables: {
      schemaId,
      data: stringifyFields(data, stringifiableFields)
    }
  }).then((resultData) => resultData.updateSchemaEntry);
}

export function restoreSchemaEntry (fragments, schemaId, schemaEntryId, version) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.restoreSchemaEntry,
      query: `
        mutation restoreSchemaEntry ($schemaId: ID!, $schemaEntryId: ID!, $version: Int!) {
          restoreSchemaEntry (schemaId: $schemaId, schemaEntryId: $schemaEntryId, version: $version) {
            ${fragmentToQL(fragments.schemaEntry)}
          }
        }
      `,
      variables: {
        schemaId,
        schemaEntryId,
        version
      }
    })
  );
}

export function validateSchemaEntrySlug ({slug, schemaId, schemaEntryId}) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.validateSchemaEntrySlug,
      query: `
        query validateSchemaEntrySlug ($slug: String!, $schemaId: ID, $schemaEntryId: ID) {
          validateSchemaEntrySlug (slug: $slug, schemaId: $schemaId, schemaEntryId: $schemaEntryId)
        }
      `,
      variables: {
        slug,
        schemaId,
        schemaEntryId
      }
    })
  );
}

export function changeSchemaEntryFields (values) {
  return {
    type: actionTypes.changeSchemaEntryFields,
    values
  };
}

export function changeSchemaEntryProperty (key, value) {
  return {
    type: actionTypes.changeSchemaEntryProperty,
    key,
    value
  };
}

export function changeSchemaEntryToDefault () {
  return {
    type: actionTypes.changeSchemaEntryToDefault
  };
}
