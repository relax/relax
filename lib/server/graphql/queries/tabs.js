import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import tabType from '../types/tab';
import TabModel from '../../models/tab';

export default {
  type: new GraphQLList(tabType),
  args: {},
  resolve (root, params, options) {
    authorize(root);
    const _userId = root.user._id;
    const projection = getProjection(options.fieldASTs[0]);

    return TabModel
      .find({
        '_id._userId': _userId
      })
      .select(projection)
      .exec();
  }
};
