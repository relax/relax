import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';
import stringifyFields from '../helpers/stringify-fields';

const stringifiableFields = ['properties', 'data'];

export function addSchemaEntry (fragments, schemaId, data) {
  return (dispatch) => {
    return request({
      dispatch,
      type: actionTypes.addSchemaEntry,
      query: `
        mutation addSchemaEntry ($schemaId: ID!, $data: SchemaEntryInput!) {
          addSchemaEntry (schemaId: $schemaId, data: $data) {
            ${fragmentToQL(fragments.schemaEntry)}
          }
        }
      `,
      variables: {
        schemaId,
        data: stringifyFields(data, stringifiableFields)
      }
    }).then((resultData) => {
      return resultData.addSchemaEntry;
    });
  };
}

export function updateSchemaEntry (fragments, schemaId, data) {
  return (dispatch) => {
    return request({
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
    }).then((resultData) => {
      return resultData.updateSchemaEntry;
    });
  };
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
