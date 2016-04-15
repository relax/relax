import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
import userType from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params) {
    authorize(root);

    if (config.demo) {
      throw new Error('Remove user is disabled on the demo');
    }

    return UserModel
      .findByIdAndRemove(params.id)
      .exec()
      .then((removedUser) => {
        if (!removedUser) {
          throw new Error('Error removing user');
        }
        return removedUser;
      });
  }
};
