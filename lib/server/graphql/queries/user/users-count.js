import {GraphQLInt} from 'graphql';

import authorize from '../../authorize';
import UserModel from '../../../models/user';

export default {
  type: GraphQLInt,
  args: {},
  async resolve (root) {
    authorize(root);
    return await UserModel.count();
  }
};
