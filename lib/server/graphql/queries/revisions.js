import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import revisionType from '../types/revision';
import RevisionModel from '../../models/revision';

export default {
  type: new GraphQLList(revisionType),
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const id = new Types.ObjectId(params.id);
    const projection = getProjection(options.fieldASTs[0]);

    return await RevisionModel
      .find({
        '_id._id': id
      })
      .sort({'_id.__v': -1})
      .select(projection)
      .exec();
  }
};
