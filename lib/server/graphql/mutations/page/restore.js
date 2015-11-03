import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import updatePageMutation from './update';
import RevisionModel from '../../../models/revision';

export default {
  type: pageType,
  args: {
    pageId: {
      name: 'pageId',
      type: new GraphQLNonNull(GraphQLID)
    },
    version: {
      name: 'version',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const {pageId: _id, version: __v} = params;

    const revision = await RevisionModel.findOne({
      '_id._id': _id,
      '_id.__v': __v
    }).exec();

    return await updatePageMutation.resolve(root, {data: revision.doc}, options);
  }
};
