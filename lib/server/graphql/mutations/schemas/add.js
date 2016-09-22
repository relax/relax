import getUniqueSlug from 'helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import schemaInputType from '../../types/schema-input';
import schemaType from '../../types/schema';
import SchemaModel from '../../../models/schema';
import schemaEntryModel from '../../../models/schema-entry';

export default {
  type: schemaType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(schemaInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const data = Object.assign({}, params.data);

    // generate slug
    if (!data.slug) {
      data.slug = await getUniqueSlug(SchemaModel, data.title);
    }

    const schema = new SchemaModel(data);
    const newSchema = await schema.save();

    if (!newSchema) {
      throw new Error('Error adding schema');
    }

    // Compile mongoose model
    const Model = await schemaEntryModel(newSchema._id);

    if (!Model) {
      // cleanup
      SchemaModel.findByIdAndRemove(newSchema._id).exec();
      throw new Error('Error adding schema, model could not be compiled');
    }

    return newSchema;
  }
};
