import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import tabType from '../../types/tab';
import TabModel from '../../../models/tab';

export default {
  type: tabType,
  args: {
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString)
    },
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const _userId = root.user._id;
    const item = params.id;
    const type = params.type;

    let tab = await TabModel.findOne({_userId, item}).exec();

    if (!tab) {
      const tabModel = new TabModel({
        _userId,
        type,
        item
      });
      tab = await tabModel.save();

      if (!tab) {
        throw new Error('Error creating tab');
      }
    } else {
      tab = null;
    }

    return tab;
  }
};
