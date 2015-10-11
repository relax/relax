import {
  GraphQLString
} from 'graphql';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: pageType,
  args: {
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  resolve: (root, params, options) => {
    // TODO Find projection to use with `select`
    return PageModel.findOne(params).exec();
  }
};
