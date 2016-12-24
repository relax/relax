import getProjection from 'helpers/get-projection';
import {GraphQLList} from 'graphql';

import authorize from '../../authorize';
import tabType from '../../types/tab';
import TabModel from '../../../models/tab';

export default {
  type: new GraphQLList(tabType),
  args: {},
  resolve (root, params, options) {
    authorize(root);
    const _userId = root.user._id;
    const projection = getProjection(options.fieldASTs[0]);

    return TabModel
      .find({_userId})
      .select(projection)
      .exec();
  }
};
