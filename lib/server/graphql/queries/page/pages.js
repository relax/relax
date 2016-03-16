import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import PageModel from '../../../models/page';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(pageType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = PageModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
