import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import {paginationQueryArgs, paginateQuery} from '../query-pagination';
import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: new GraphQLList(pageType),
  args: {
    ...paginationQueryArgs
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);
    const query = PageModel.find();

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
