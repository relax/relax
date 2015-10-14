import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import {paginationQueryArgs, paginateQuery, searchQuery} from '../query-pagination';
import userType from '../types/user';
import UserModel from '../../models/user';

export default {
  type: new GraphQLList(userType),
  args: {
    ...paginationQueryArgs
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);
    const query = UserModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
