import getProjection from 'helpers/get-projection';
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';

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
    },
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const itemId = new Types.ObjectId(params.id);
    const userId = root.user._id;

    let result = await DraftModel.findOne({itemId, userId}).select(projection).exec();

    if (!result) {
      const Model = getModelFromType(params.type);
      const item = await Model.findById(itemId).exec();
      const draft = new DraftModel({
        itemId,
        userId,
        __v: item.__v,
        type: params.type,
        data: item.data
      });
      result = await draft.save();
    }

    return result;
  }
};
