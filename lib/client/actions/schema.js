import {fragmentToQL} from 'relax-framework';

import actionTypes from './types';
import request from '../helpers/request';

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
  const schemaData = Object.assign({}, data, {
    properties: JSON.stringify(data.properties)
  });
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
        data: schemaData
      }
    })
  );
}

export function addSchema (fragments, data) {
  const schemaData = Object.assign({}, data, {
    properties: JSON.stringify(data.properties)
  });
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
        data: schemaData
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
