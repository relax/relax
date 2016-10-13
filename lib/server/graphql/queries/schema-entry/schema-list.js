import getProjection from 'helpers/get-projection';
import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryModel from '../../../models/schema-entry';
import schemaEntryType from '../../types/schema-entry';
import SchemaModel from '../../../models/schema';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(schemaEntryType),
  args: {
    schemaId: {
      name: 'schemaId',
      type: new GraphQLNonNull(GraphQLID)
    },
    ...paginationQueryArgs
  },
  async resolve (root, params, options) {
    const schema = await SchemaModel
      .findById(params.schemaId)
      .select('_id publicReadable')
      .lean()
      .exec();

    if (!schema) {
      throw new Error('Could not find schema');
    }

    if (!schema.publicReadable) {
      authorize(root);
    }

    const Model = await schemaEntryModel(params.schemaId);

    const projection = getProjection(options.fieldASTs[0]);
    const query = Model.find(searchQuery({}, params));

    paginateQuery(query, params);

    return await query.select(projection).exec();
  }
};
