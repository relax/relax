import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import draftType from '../../types/draft';
import DraftModel from '../../../models/draft';
import PageModel from '../../../models/page';

export default {
  type: draftType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);
    const _userId = root.user._id;

    const page = await PageModel.findById(_id);

    const data = {
      data: page.data,
      actions: [],
      __v: page.__v
    };

    const resultDraft = await DraftModel
      .findByIdAndUpdate(
        {_id, _userId},
        data,
        {upsert: true, new: true}
      )
      .select(projection)
      .exec();

    if (!resultDraft) {
      throw new Error('Draft not found');
    }
    return resultDraft;
  }
};
