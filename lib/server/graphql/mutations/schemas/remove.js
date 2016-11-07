import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import SchemaModel from '../../../models/schema';
import authorize from '../../authorize';
import schemaType from '../../types/schema';
import schemaEntryModel, {removeModel} from '../../../models/schema-entry';
import dropCollection from 'helpers/db/drop-collection';
import cleanModelRefs from '../_helpers/clean-model-refs';

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

    const schemaId = params.id;

    // Get schema mongoose model
    const Model = await schemaEntryModel(schemaId);

    if (!Model) {
      throw new Error('Could not find schema model');
    }

    // drop collection
    await dropCollection(Model.collection);

    // drop references
    await cleanModelRefs(schemaId);

    // remove the model
    removeModel(schemaId);

    // remove schema
    const removedSchema = await SchemaModel.findByIdAndRemove(schemaId);

    if (!removedSchema) {
      throw new Error('Error removing schema');
    }

    return removedSchema;
  }
};
