import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

import authorize from '../../authorize';
import buildableType from '../../types/buildable';
import draftType from '../../types/draft';
import revisionType from '../../types/revision';
import updateItem from '../_helpers/update-item';
import DraftModel from '../../../models/draft';

export default {
  type: new GraphQLObjectType({
    name: 'DraftSaveType',
    fields: {
      item: {type: buildableType},
      draft: {type: draftType},
      revision: {type: revisionType}
    }
  }),
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    doc: {
      name: 'doc',
      type: new GraphQLNonNull(GraphQLJSON)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const doc = params.doc;
    const draft = await DraftModel.findById(params.id);

    // Update item
    const {item, revision} = await updateItem({
      id: draft.itemId,
      type: draft.type,
      changes: doc,
      userId: root.user._id
    });

    // Update draft
    const resultDraft = await DraftModel.findByIdAndUpdate(
      params.id,
      {
        __v: item.__v,
        doc,
        actions: []
      },
      {upsert: true, new: true}
    );

    return {
      item,
      revision,
      draft: resultDraft
    };
  }
};
