import {GraphQLInt} from 'graphql';

import authorize from '../../authorize';
import SchemaModel from '../../../models/schema';

export default {
  type: GraphQLInt,
  args: {},
  async resolve (root) {
    authorize(root);
    return await SchemaModel.count();
  }
};
