import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

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
    const projection = getProjection(options.fieldASTs[0]);
    return PageModel.findOne(params).select(projection).exec();
  }
};
