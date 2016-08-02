import {mutation} from 'relate-js';

export function updateDraft () {
  return (dispatch, getState) => {
    const pageBuilder = getState().pageBuilder;
    const draftInput = Object.assign({}, {
      doc: pageBuilder.doc,
      actions: pageBuilder.actions
    });

    return mutation({
      fragments: {
        updateDraft: {
          _id: 1
        }
      },
      variables: {
        updateDraft: {
          id: {
            type: 'ID!',
            value: pageBuilder.id
          },
          data: {
            type: 'DraftInput!',
            value: draftInput
          }
        }
      }
    })(dispatch, getState);
  };
}

export function saveDraft () {
  return (dispatch, getState) => {
    const pageBuilder = getState().pageBuilder;
    const doc = pageBuilder.doc;

    return mutation({
      fragments: {
        saveDraft: {
          item: {
            _id: 1,
            __v: 1,
            updatedDate: 1,
            updatedBy: {
              _id: 1,
              email: 1,
              name: 1
            },
            hasContent: pageBuilder.type === 'template'
          },
          draft: {
            _id: 1,
            __v: 1,
            actions: 1,
            doc: 1
          },
          revision: {
            _id: 1,
            version: 1,
            date: 1,
            user: {
              _id: 1,
              email: 1,
              name: 1
            }
          }
        }
      },
      variables: {
        saveDraft: {
          id: {
            type: 'ID!',
            value: pageBuilder.id
          },
          doc: {
            type: 'JSON!',
            value: doc
          }
        }
      }
    })(dispatch, getState);
  };
}

export function dropDraft () {
  return (dispatch, getState) => {
    const pageBuilder = getState().pageBuilder;

    return mutation({
      fragments: {
        dropDraft: {
          _id: 1,
          __v: 1,
          data: 1,
          actions: 1
        }
      },
      variables: {
        dropDraft: {
          id: {
            type: 'ID!',
            value: pageBuilder.id
          }
        }
      },
      type: 'REMOVE'
    })(dispatch, getState);
  };
}
