import Q from 'q';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import schemaEntryInputType from '../../types/schema-entry-input';
import schemaEntryType from '../../types/schema-entry';
import SchemaEntryModel from '../../../models/schema-entry';

const parsableFields = ['data', 'properties'];

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
    const schemaEntry = new Model(parseFields(params.data, parsableFields));

    const newSchemaEntry = await schemaEntry.save();

    if (!newSchemaEntry) {
      throw new Error('Error saving schema entry');
    }
    return newSchemaEntry;
  }
};
