import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryModel from '../../../models/schema-entry';
import schemaEntryType from '../../types/schema-entry';

export default {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    },
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const Model = await schemaEntryModel(params.schemaId);
    const removedSchemaEntry = await Model.findByIdAndRemove(params.id).exec();

    if (!removedSchemaEntry) {
      throw new Error('Schema entry not found');
    }
    return removedSchemaEntry;
  }
};
