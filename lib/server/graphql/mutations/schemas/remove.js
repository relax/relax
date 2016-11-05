import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import SchemaModel from '../../../models/schema';
import authorize from '../../authorize';
import schemaType from '../../types/schema';

export default {
  type: schemaType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const removedSchema = await SchemaModel.findByIdAndRemove(params.id);

    // TODO https://gist.github.com/sdgluck/950cb9c8af974992e3eb

    if (!removedSchema) {
      throw new Error('Schema not found');
    }
    return removedSchema;
  }
};
