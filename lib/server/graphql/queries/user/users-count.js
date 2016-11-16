import {GraphQLInt} from 'graphql';
import UserModel from '../../../models/user';

export default {
  type: GraphQLInt,
  args: {},
  async resolve () {
    return await UserModel.count().exec();
  }
};
