import {
  GraphQLID,
  GraphQLInt
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryModel from '../../../models/schema-entry';

export default {
  type: GraphQLInt,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    }
  },
  async resolve (root, params) {
    authorize(root);

    const Model = await schemaEntryModel(params.schemaId);

    return await Model.count().exec();
  }
};
