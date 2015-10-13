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
      type: GraphQLString
    },
    page: {
      name: 'page',
      type: GraphQLString
    }
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);
    const query = PageModel.find();

    if (params.sort) {
      const sort = {};
      sort[params.sort] = params.order || 'asc';
      query.sort(sort);
    }
    if (params.page && params.limit) {
      console.log((parseInt(params.page, 10) - 1) * parseInt(params.limit, 10));
      query.skip((parseInt(params.page, 10) - 1) * parseInt(params.limit, 10));
    }
    if (params.limit) {
      console.log(params.limit);
      query.limit(params.limit);
    }

    query.select(projection);

    return query.exec();
  }
};
