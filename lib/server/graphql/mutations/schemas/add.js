import slugify from 'slug';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import schemaInputType from '../../types/schema-input';
import schemaType from '../../types/schema';
import SchemaModel from '../../../models/schema';

async function iterateSlug (slug) {
  const exists = await SchemaModel.count({slug});
  return {
    exists,
    slug
  };
}

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
      let generatedSlug = slugify(data.title).toLowerCase();
      const {exists} = await iterateSlug(generatedSlug);

      if (exists) {
        let result;
        let counter = 1;
        do {
          result = await iterateSlug(`${generatedSlug}-${counter}`);
          counter++;
        } while (result.exists);

        generatedSlug = result.slug;
      }

      data.slug = generatedSlug;
    }

    const schema = new SchemaModel(data);

    const newSchema = await schema.save();

    if (!newSchema) {
      throw new Error('Error adding schema');
    }
    return newSchema;
  }
};
