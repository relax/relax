import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../query-pagination';
import schemaType from '../types/schema';
import SchemaModel from '../../models/schema';

export default {
  type: new GraphQLList(schemaType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = SchemaModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
