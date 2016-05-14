import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import PageModel from '../../../models/page';
import RevisionModel from '../../../models/revision';
import TabModel from '../../../models/tab';

export default {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const removedPage = await PageModel.findByIdAndRemove(params.id).exec();

    if (!removedPage) {
      throw new Error('Page not found');
    }

    await TabModel.find({item: params.id}).remove();
    await RevisionModel.find({itemId: params.id}).remove();

    return removedPage;
  }
};
