import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryType from '../../types/schema-entry';
import SchemaEntryModel from '../../../models/schema-entry';

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
  async resolve (root, params, options) {
    authorize(root);

    const Model = await SchemaEntryModel(params.schemaId);
    const removedSchemaEntry = await Model.findByIdAndRemove(params.id).exec();

    if (!removedSchemaEntry) {
      throw new Error('Schema entry not found');
    }
    return removedSchemaEntry;
  }
};
