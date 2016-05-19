import {mutation} from 'relate-js';

export function restoreRevision (revisionId) {
  return mutation({
    fragments: {
      restoreRevision: {
        item: {
          _id: 1,
          __v: 1,
          title: 1,
          slug: 1,
          state: 1,
          updatedDate: 1,
          updatedBy: {
            _id: 1,
            email: 1,
            name: 1
          }
        },
        draft: {
          _id: 1,
          __v: 1,
          actions: 1,
          data: 1
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
      restoreRevision: {
        id: {
          value: revisionId,
          type: 'ID!'
        }
      }
    }
  });
}
