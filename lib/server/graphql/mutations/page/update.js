import {
  GraphQLNonNull
} from 'graphql';

import {getProjection} from 'relax-framework';
import Q from 'q';

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
    const projection = getProjection(options.fieldASTs[0]);

    return Q()
      .then(() => (
        PageModel
          .findOneAndUpdate({_id: params.data._id}, params.data, {new: true})
          .select(projection)
          .exec()
      ))
      .then((page) => {
        if (!page) {
          throw new Error('Page not found');
        }
        return page;
      });
  }
};
