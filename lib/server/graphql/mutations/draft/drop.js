import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import draftType from '../../types/draft';
import getModelFromType from '../../get-model-from-type';
import DraftModel from '../../../models/draft';

export default {
  type: draftType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    const draft = await DraftModel.findById(params.id);
    const Model = getModelFromType(draft.type);
    const item = await Model.findById(draft.itemId);

    const data = {
      __v: item.__v,
      data: item.data,
      actions: []
    };

    const resultDraft = await DraftModel
      .findByIdAndUpdate(
        params.id,
        data,
        {upsert: true, new: true}
      )
      .select(projection)
      .exec();

    if (!resultDraft) {
      throw new Error('Error dropping draft');
    }

    return resultDraft;
  }
};
