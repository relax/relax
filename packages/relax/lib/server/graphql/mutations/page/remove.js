import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import cleanItemRefs from '../_helpers/clean-item-refs';
import pageType from '../../types/page';
import PageModel from '../../../models/page';

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

    await cleanItemRefs(removedPage._id);

    return removedPage;
  }
};
