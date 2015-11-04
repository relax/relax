import {
  GraphQLID
} from 'graphql';

import authorize from '../authorize';
import countType from '../types/count';
import SchemaEntryModel from '../../models/schema-entry';
import SchemaModel from '../../models/schema';

export default {
  type: countType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const Model = await SchemaEntryModel(params.schemaId);

    const count = await Model.count({}).exec();
    return {count};
  }
};
