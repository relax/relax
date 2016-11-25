import {mutation} from 'relate-js';

export function restoreRevision (revisionId) {
  return mutation({
    fragments: {
      restoreRevision: {
        _id: 1,
        __v: 1,
        actions: 1,
        doc: 1,
        restored: 1
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
