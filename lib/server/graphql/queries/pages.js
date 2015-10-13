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
      const sort = {};
      sort[params.sort] = params.order || 'asc';
      query.sort(sort);
    }
    if (params.page && params.limit) {
      console.log('test');
      console.log(params.page);
      console.log(params.limit);
      query.skip((parseInt(params.page, 10) - 1) * parseInt(params.limit, 10));
    }
    if (params.limit) {
      query.limit(params.limit);
    }

    query.select(projection);

    return query.exec();
  }
};
