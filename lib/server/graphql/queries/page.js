import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLNumber,
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework/lib/server/graphql-utils';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: pageType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, params, {fieldASTs}) => {
    const projection = getProjection(fieldASTs[0]);
    return PageModel.findById(params._id, projection).exec();
  }
};
