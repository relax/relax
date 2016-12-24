import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import tabType from '../../types/tab';
import TabModel from '../../../models/tab';

export default {
  type: tabType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedTab = await TabModel
      .findByIdAndRemove(params.id, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!removedTab) {
      throw new Error('Tab not found');
    }

    return removedTab;
  }
};
