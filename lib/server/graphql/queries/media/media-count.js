import {GraphQLInt} from 'graphql';

import authorize from '../../authorize';
import MediaModel from '../../../models/media';

export default {
  type: GraphQLInt,
  args: {},
  async resolve (root) {
    authorize(root);
    return await MediaModel.count();
  }
};
