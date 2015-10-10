import {
  GraphQLString,
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework/lib/server/graphql-utils';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: new GraphQLList(pageType),
  args: {
    _id: {
      name: '_id',
      type: GraphQLString
    }
  },
  resolve: (root, params, {fieldASTs}) => {
    const projection = getProjection(fieldASTs[0]);
    return PageModel.find(params).select(projection).exec();
  }
};
