import {mutation} from 'relate-js';

export function saveDraft () {
  return (dispatch, getState) => {
    const pageBuilder = getState().pageBuilder;
    const draftInput = Object.assign({}, {
      data: JSON.stringify(pageBuilder.data),
      actions: JSON.stringify(pageBuilder.actions)
    });

    return mutation({
      fragments: {
        updateDraft: {
          _id: {
            _id: 1,
            _userId: 1
          }
        }
      },
      variables: {
        updateDraft: {
          id: {
            type: 'ID!',
            value: getState().router.params.id
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

export function dropDraft (id) {
  return mutation({
    fragments: {
      dropDraft: {
        _id: 1
      }
    },
    variables: {
      dropDraft: {
        id: {
          type: 'ID!',
          value: id
        }
      }
    },
    type: 'REMOVE'
  });
}
