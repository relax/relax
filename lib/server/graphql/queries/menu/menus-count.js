import {GraphQLInt} from 'graphql';

import authorize from '../../authorize';
import MenuModel from '../../../models/menu';

export default {
  type: GraphQLInt,
  args: {},
  async resolve (root) {
    authorize(root);
    return await MenuModel.count();
  }
};
