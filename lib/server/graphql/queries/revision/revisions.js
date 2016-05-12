import getProjection from 'helpers/get-projection';
import {
  GraphQLList,
  GraphQLID
} from 'graphql';
import {Types} from 'mongoose';

import authorize from '../../authorize';
import revisionType from '../../types/revision';
import RevisionModel from '../../../models/revision';

export default {
  type: new GraphQLList(revisionType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const id = new Types.ObjectId(params.id);
    const projection = getProjection(options.fieldASTs[0]);

    return await RevisionModel
      .find({
        itemId: id
      })
      .sort({
        version: -1
      })
      .select(projection);
  }
};
