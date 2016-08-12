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

export function updateSchemaEntryTitle (schemaId, id, title) {
  return mutation({
    fragments: {
      updateSchemaEntryTitle: {
        _id: 1,
        title: 1,
        __v: 1,
        updatedDate: 1,
        updatedBy: {
          _id: 1,
          email: 1,
          name: 1
        }
      }
    },
    variables: {
      updateSchemaEntryTitle: {
        schemaId: {
          value: schemaId,
          type: 'ID!'
        },
        id: {
          value: id,
          type: 'ID!'
        },
        title: {
          value: title,
          type: 'String!'
        }
      }
    }
  });
}

export function updateSchemaEntrySlug (schemaId, id, slug) {
  return mutation({
    fragments: {
      updateSchemaEntrySlug: {
        _id: 1,
        slug: 1,
        __v: 1,
        updatedDate: 1,
        updatedBy: {
          _id: 1,
          email: 1,
          name: 1
        }
      }
    },
    variables: {
      updateSchemaEntrySlug: {
        schemaId: {
          value: schemaId,
          type: 'ID!'
        },
        id: {
          value: id,
          type: 'ID!'
        },
        slug: {
          value: slug,
          type: 'String!'
        }
      }
    }
  });
}

export function updateSchemaEntryTemplate (schemaId, id, templateId) {
  return mutation({
    fragments: {
      updateSchemaEntryTemplate: {
        _id: 1,
        __v: 1,
        updatedDate: 1,
        updatedBy: {
          _id: 1,
          email: 1,
          name: 1
        },
        template: {
          _id: 1,
          title: 1,
          data: 1
        }
      }
    },
    variables: {
      updateSchemaEntryTemplate: {
        schemaId: {
          value: schemaId,
          type: 'ID!'
        },
        id: {
          value: id,
          type: 'ID!'
        },
        templateId: {
          value: templateId,
          type: 'ID'
        }
      }
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

export function validateSchemaEntrySlug ({slug, schemaId, id}) {
  return mutation({
    fragments: {
      validateSchemaEntrySlug: 1
    },
    variables: {
      validateSchemaEntrySlug: {
        schemaId: {
          value: schemaId,
          type: 'ID!'
        },
        id: {
          value: id,
          type: 'ID!'
        },
        slug: {
          value: slug,
          type: 'String!'
        }
      }
    }
  });
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
