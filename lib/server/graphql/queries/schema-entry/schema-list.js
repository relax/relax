import getProjection from 'helpers/get-projection';
import {
  GraphQLList,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryModel from '../../../models/schema-entry';
import schemaEntryType from '../../types/schema-entry';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

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

    const Model = await schemaEntryModel(params.schemaId);

    const projection = getProjection(options.fieldASTs[0]);
    const query = Model.find(searchQuery({}, params));

    paginateQuery(query, params);

    return await query.select(projection).exec();
  }
};
