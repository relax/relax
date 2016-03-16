import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import menuType from '../../types/menu';
import MenuModel from '../../../models/menu';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(menuType),
  args: {
    ...paginationQueryArgs
  },
  resolve: (root, params, options) => {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = MenuModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
