import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: new GraphQLObjectType({
    name: 'Pages',
    fields: {
      data: {
        type: new GraphQLList(pageType)
      }
    }
  }),
  args: {
  },
  resolve: (root, params, options) => {
    return PageModel
      .find(params)
      .exec()
      .then((pages) => {
        return {data: pages};
      });
  }
};
