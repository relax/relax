import {
  GraphQLList,
  GraphQLID
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import schemaEntryType from '../types/schema-entry';
import SchemaEntryModel from '../../models/schema-entry';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../query-pagination';

export default {
  type: new GraphQLList(schemaEntryType),
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    },
    ...paginationQueryArgs
  },
  async resolve (root, params, options) {
    authorize(root);

    const Model = await SchemaEntryModel(params.schemaId);

    const projection = getProjection(options.fieldASTs[0]);
    const query = Model.find(searchQuery({}, params));

    paginateQuery(query, params);

    return await query.select(projection).exec();
  }
};
