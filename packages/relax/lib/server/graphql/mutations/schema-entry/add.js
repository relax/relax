import getUniqueSlug from 'helpers/get-unique-slug';
import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import SchemaModel from '../../../models/schema';
import authorize from '../../authorize';
import schemaEntryInputType from '../../types/schema-entry-input';
import schemaEntryModel from '../../../models/schema-entry';
import schemaEntryType from '../../types/schema-entry';

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
    const schema = await SchemaModel
      .findById(params.schemaId)
      .select('_id publicWritable')
      .lean()
      .exec();

    if (!schema) {
      throw new Error('Could not find schema');
    }

    if (!schema.publicWritable) {
      authorize(root);
    }

    const Model = await schemaEntryModel(params.schemaId);
    const data = Object.assign({}, params.data);

    // generate slug
    if (!data.slug && data.title) {
      data.slug = await getUniqueSlug(Model, data.title);
    }

    // Add user info
    data.schemaId = params.schemaId;
    data.createdBy = root.user._id;
    data.updatedBy = root.user._id;

    const schemaEntry = new Model(data);
    const newSchemaEntry = await schemaEntry.save();

    if (!newSchemaEntry) {
      throw new Error('Error creating schema entry');
    }
    return newSchemaEntry;
  }
};
