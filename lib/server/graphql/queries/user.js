import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

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
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);
    return UserModel.findOne(params).select(projection).exec();
  }
};
