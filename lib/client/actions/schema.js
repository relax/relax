import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';
import stringifyFields from '../helpers/stringify-fields';

const stringifiableFields = ['properties', 'data'];

export function getSchema (fragments, slug) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.getSchema,
      query: `
        query schema ($slug: String!) {
          schema (slug: $slug) {
            ${fragmentToQL(fragments.schema)}
          }
        }
      `,
      variables: {
        slug
      }
    })
  );
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

export function addSchema (fragments, data) {
  return (dispatch) => (
    request({
      dispatch,
      type: actionTypes.addSchema,
      query: `
        mutation addSchema ($data: SchemaInput!) {
          addSchema (data: $data) {
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

export function changeSchemaFields (values) {
  return {
    type: actionTypes.changeSchemaFields,
    values
  };
}

export function changeSchemaToDefault () {
  return {
    type: actionTypes.changeSchemaToDefault
  };
}
