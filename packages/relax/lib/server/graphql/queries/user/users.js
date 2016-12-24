import getProjection from 'helpers/get-projection';
import {GraphQLList} from 'graphql';

import authorize from '../../authorize';
import userType from '../../types/user';
import UserModel from '../../../models/user';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(userType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = UserModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
