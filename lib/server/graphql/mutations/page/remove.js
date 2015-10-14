import {
  GraphQLNonNull
} from 'graphql';

import pageType from '../../types/page';
import pageInputType from '../../types/page-input';
import PageModel from '../../../models/page';

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  resolve (root, params, options) {
    return PageModel
      .findByIdAndRemove(
        params.data._id
      )
      .exec()
      .then((removedPage) => {
        if (!removedPage) {
          throw new Error('Page not found');
        }
        return removedPage;
      });
  }
};
