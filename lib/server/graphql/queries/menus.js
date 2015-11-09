import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../query-pagination';
import menuType from '../types/menu';
import MenuModel from '../../models/menu';

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
