import {
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import draftType from '../types/draft';
import DraftModel from '../../models/draft';

export default {
  type: draftType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },
    user: {
      name: 'id',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);
    const _userId = new Types.ObjectId(params.user);

    return DraftModel
      .findById({_id, _userId})
      .select(projection)
      .then((draftResult) => {
        if (!draftResult) {
          return false;
        }
        return draftResult;
      });
  }
};
