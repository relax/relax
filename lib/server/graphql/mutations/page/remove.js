import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import pageInputType from '../../types/page-input';
import pageType from '../../types/page';
import PageModel from '../../../models/page';
import RevisionModel from '../../../models/revision';
import TabModel from '../../../models/tab';

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedPage = await PageModel.findByIdAndRemove(params.data._id).exec();

    if (!removedPage) {
      throw new Error('Page not found');
    }

    await TabModel.find({'_id._id': params.data._id}).remove().exec();
    await RevisionModel.find({'_id._id': params.data._id}).remove().exec();

    return removedPage;
  }
};
