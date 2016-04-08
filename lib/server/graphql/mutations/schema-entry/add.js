import getUniqueSlug from 'helpers/get-unique-slug';
import parseFields from 'helpers/parse-fields';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryInputType from '../../types/schema-entry-input';
import schemaEntryModel from '../../../models/schema-entry';
import schemaEntryType from '../../types/schema-entry';

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
  async resolve (root, params) {
    authorize(root);

    const Model = await schemaEntryModel(params.schemaId);
    const data = parseFields(Object.assign({}, params.data), parsableFields);

    // generate slug
    if (!data.slug) {
      data.slug = await getUniqueSlug(Model, data.title);
    }

    const schemaEntry = new Model(data);
    const newSchemaEntry = await schemaEntry.save();

    if (!newSchemaEntry) {
      throw new Error('Error creating schema entry');
    }
    return newSchemaEntry;
  }
};
