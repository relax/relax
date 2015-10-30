import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import tabType from '../../types/tab';
import TabModel from '../../../models/tab';

export default {
  type: tabType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const _id = new Types.ObjectId(params.id);
    const _userId = new Types.ObjectId(root.user._id);

    const removedTab = await TabModel
      .findByIdAndRemove({_id, _userId}, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!removedTab) {
      throw new Error('Tab not found');
    }

    return removedTab;
  }
};
