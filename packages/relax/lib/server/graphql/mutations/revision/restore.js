import {GraphQLID, GraphQLNonNull} from 'graphql';

import DraftModel from '../../../models/draft';
import RevisionModel from '../../../models/revision';
import authorize from '../../authorize';
import draftType from '../../types/draft';
import getModelFromType from '../../get-model-from-type';

export default {
  type: draftType,
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

    const Model = await getModelFromType(revision.type);
    const currentItem = await Model.findById(revision.itemId);

    if (!currentItem) {
      throw new Error('Could not find item in restore mutation');
    }

    const draft = await DraftModel.findOneAndUpdate(
      {itemId: revision.itemId, userId: root.user._id},
      {
        __v: currentItem.__v,
        doc: revision.doc,
        actions: [],
        restored: true
      },
      {upsert: true, new: true}
    );

    return draft;
  }
};
