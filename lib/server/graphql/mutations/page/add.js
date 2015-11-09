import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
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
    authorize(root);

    const page = new PageModel(params.data);

    return Q()
      .then(() => page.save())
      .then((newPage) => {
        if (!newPage) {
          throw new Error('Page not found');
        }
        return newPage;
      });
  }
};
