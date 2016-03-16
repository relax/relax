import {GraphQLInt} from 'graphql';

import PageModel from '../../../models/page';

export default {
  type: GraphQLInt,
  args: {},
  async resolve () {
    const count = PageModel.count();
    return count;
  }
};
