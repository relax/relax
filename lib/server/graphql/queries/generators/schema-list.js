import {
  GraphQLList
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import SchemaEntryModel from '../../../models/schema-entry';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default (type, schema) => {
  return {
    type: new GraphQLList(type),
    args: {
      ...paginationQueryArgs
    },
    async resolve (root, params, options) {
      authorize(root);

      const Model = SchemaEntryModel(schema);

      const projection = getProjection(options.fieldASTs[0]);
      const query = Model.find(searchQuery({}, params));

      paginateQuery(query, params);

      return await query.select(projection).exec();
    }
  };
};
