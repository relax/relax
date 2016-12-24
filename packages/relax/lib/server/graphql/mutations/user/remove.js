import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
import userType from '../../types/user';
import DraftModel from '../../../models/draft';
import TabModel from '../../../models/tab';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    if (config.demo) {
      throw new Error('Remove user is disabled on the demo');
    }

    const removedUser = await UserModel.findByIdAndRemove(params.id).exec();

    if (!removedUser) {
      throw new Error('Error removing user');
    }

    // clean user's tabs and drafts
    await TabModel.find({_userId: removedUser._id}).remove();
    await DraftModel.find({userId: removedUser._id}).remove();

    return removedUser;
  }
};
