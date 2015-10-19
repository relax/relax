import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import userType from '../types/user';
import UserModel from '../../models/user';

export default {
  type: userType,
  args: {
    username: {
      name: 'username',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    return UserModel.findOne(params).select(projection).exec();
  }
};
