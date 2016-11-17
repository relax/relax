import {GraphQLInt} from 'graphql';

import PageModel from '../../../models/page';

export default {
  type: GraphQLInt,
  args: {},
  async resolve () {
    return await PageModel.count().exec();
  }
};
