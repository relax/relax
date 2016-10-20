import {push, pushState} from 'redux-router';

import actionTypes from 'actions';
import {fragmentToQL} from 'relax-fragments';
import {mutation} from 'relate-js';
import request from 'helpers/request';

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

export function updateSchemaEntryProperties (schemaId, id, properties) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.schemaEntrySaving
    });
    return mutation({
      fragments: {
        updateSchemaEntry: {
          _id: 1,
          properties: 1
        }
      },
      variables: {
        updateSchemaEntry: {
          schemaId: {
            value: schemaId,
            type: 'ID!'
          },
          id: {
            value: id,
            type: 'ID!'
          },
          data: {
            value: {properties},
            type: 'SchemaEntryInput!'
          }
        }
      }
    }, () => {
      dispatch({
        type: actionTypes.schemaEntrySaved
      });
      setTimeout(() => {
        dispatch({
          type: actionTypes.schemaEntrySavedOut
        });
      }, 2000);
    })(dispatch, getState);
  };
}

export function removeSchemaEntry (schemaId, id, redirect = false, type = 'data') {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.removingSchemaEntry
    });

    return mutation({
      fragments: {
        removeSchemaEntry: {
          _id: 1
        }
      },
      variables: {
        removeSchemaEntry: {
          id: {
            value: id,
            type: 'ID!'
          },
          schemaId: {
            value: schemaId,
            type: 'ID!'
          }
        }
      },
      type: 'REMOVE'
    }, () => {
      dispatch({
        type: actionTypes.removedSchemaEntry
      });

      if (redirect) {
        dispatch(push(`/admin/schemas/${type}/${schemaId}`));
      }
    })(dispatch, getState);
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
