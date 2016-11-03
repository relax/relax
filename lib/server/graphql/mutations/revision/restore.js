import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import DraftModel from '../../../models/draft';
import RevisionModel from '../../../models/revision';
import authorize from '../../authorize';
import buildableType from '../../types/buildable';
import draftType from '../../types/draft';
import revisionType from '../../types/revision';
import updateItem from '../_helpers/update-item';

export default {
  type: new GraphQLObjectType({
    name: 'RevisionRestore',
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
    }
  },
  async resolve (root, params) {
    authorize(root);

    const revision = await RevisionModel.findById(params.id).lean().exec();

    if (!revision) {
      throw new Error('Revision not found');
    }

    const result = await updateItem({
      id: revision.itemId,
      type: revision.type,
      changes: revision.doc,
      userId: root.user._id
    });
    const draft = await DraftModel.findOneAndUpdate(
      {itemId: revision.itemId, userId: root.user._id},
      {
        __v: result.item.__v,
        doc: result.item,
        actions: []
      },
      {upsert: true, new: true}
    );

    return {
      item: result.item,
      revision: result.revision,
      draft
    };
  }
};
