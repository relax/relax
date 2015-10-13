import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import {getProjection} from 'relax-framework';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: new GraphQLList(pageType),
  args: {
    sort: {
      name: 'sort',
      type: GraphQLString
    },
    order: {
      name: 'order',
      type: GraphQLString
    },
    limit: {
      name: 'limit',
      type: GraphQLInt
    },
    page: {
      name: 'page',
      type: GraphQLInt
    }
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);
    const query = PageModel.find();

    if (params.sort) {
      query.sort({
        [params.sort]: params.order || 'asc'
      });
    }
    if (params.page && params.limit) {
      query.skip((params.page - 1) * params.limit);
    }
    if (params.limit) {
      query.limit(params.limit);
    }

    query.select(projection);

    return query.exec();
  }
};
