import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import schemaType from '../../types/schema';
import SchemaModel from '../../../models/schema';

export default {
  type: schemaType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedSchema = await SchemaModel.findByIdAndRemove(params.id);

    if (!removedSchema) {
      throw new Error('Schema not found');
    }
    return removedSchema;
  }
};
