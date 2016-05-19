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
import RevisionModel from '../../../models/revision';

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

    const revision = await RevisionModel.findById(params.id);
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
        data: result.item.data,
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
