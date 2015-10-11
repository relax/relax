import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: new GraphQLList(pageType),
  args: {
  },
  resolve: (root, params, options) => {
    return PageModel
      .find(params)
      .exec()
      .then((pages) => {
        return pages;
      });
  }
};
