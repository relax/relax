import Q from 'q';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryInputType from '../../types/schema-entry-input';
import schemaEntryType from '../../types/schema-entry';
import SchemaEntryModel from '../../../models/schema-entry';

export default {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(schemaEntryInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const Model = await SchemaEntryModel(params.schemaId);
    const schemaEntry = new Model(params.data);

    const newSchemaEntry = await schemaEntry.save();

    if (!newSchemaEntry) {
      throw new Error('Error saving schema entry');
    }
    return newSchemaEntry;
  }
};
