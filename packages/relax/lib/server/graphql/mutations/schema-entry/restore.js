import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryType from '../../types/schema-entry';
import updateSchemaEntryMutation from './update';
import RevisionModel from '../../../models/revision';

export default {
  type: schemaEntryType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    },
    schemaEntryId: {
      name: 'schemaEntryId',
      type: new GraphQLNonNull(GraphQLID)
    },
    version: {
      name: 'version',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const {schemaEntryId: _id, version: __v} = params;

    const revision = await RevisionModel.findOne({
      '_id._id': _id,
      '_id.__v': __v
    }).exec();

    return await updateSchemaEntryMutation.resolve(
      root,
      {schemaId: params.schemaId, data: revision.doc},
      options
    );
  }
};
