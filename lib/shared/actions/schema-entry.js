import actionTypes from 'actions';
import request from 'helpers/request';
import {pushState} from 'redux-router';
import {mutation} from 'relate-js';
import {fragmentToQL} from 'relax-fragments';

export function changeSchemaEntryToDefaults (schema) {
  return {
    type: actionTypes.changeSchemaEntryToDefaults,
    schema
  };
}

export function addSchemaEntry (schemaId, schemaType, data, redirect = false) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.schemaEntrySaving
    });

    mutation({
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
    }, (result) => {
      if (redirect) {
        dispatch({
          type: actionTypes.schemaEntrySavedOut
        });
        dispatch(pushState(null, `/admin/schemas/${schemaType}/${schemaId}/${result.addSchemaEntry._id}`));
      } else {
        dispatch({
          type: actionTypes.schemaEntrySaved
        });
        setTimeout(() => {
          dispatch({
            type: actionTypes.schemaEntrySavedOut
          });
        }, 2000);
      }
    })(dispatch, getState);
  };
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
      data
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
