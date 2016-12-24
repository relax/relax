import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryModel from '../../../models/schema-entry';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default (type, schema) => ({
  type: new GraphQLList(type),
  args: {
    ...paginationQueryArgs
  },
  async resolve (root, params, options) {
    authorize(root);

    const Model = schemaEntryModel(schema);

    const projection = getProjection(options.fieldASTs[0]);
    const query = Model.find(searchQuery({}, params));

    paginateQuery(query, params);

    return await query.select(projection).exec();
  }
});
