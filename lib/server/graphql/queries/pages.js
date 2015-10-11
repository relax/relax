import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import {getProjection} from 'relax-framework';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: new GraphQLList(pageType),
  args: {
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);

    return PageModel
      .find(params)
      .select(projection)
      .exec();
  }
};
