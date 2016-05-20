import getUniqueSlug from 'helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import schemaInputType from '../../types/schema-input';
import schemaType from '../../types/schema';
import SchemaModel from '../../../models/schema';

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

    const data = Object.assign({}, params.data, {
      properties: JSON.parse(params.data.properties)
    });

    // generate slug
    if (!data.slug) {
      data.slug = await getUniqueSlug(SchemaModel, data.title);
    }

    const schema = new SchemaModel(data);
    const newSchema = await schema.save();

    if (!newSchema) {
      throw new Error('Error adding schema');
    }
    return newSchema;
  }
};
