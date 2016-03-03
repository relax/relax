import {
  GraphQLInt
} from 'graphql';

import authorize from '../../authorize';
import PageModel from '../../../models/page';

export default {
  type: GraphQLInt,
  args: {},
  async resolve (root, params, options) {
    const count = PageModel.count();
    return count;
  }
};
