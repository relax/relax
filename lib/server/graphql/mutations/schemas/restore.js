import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt
} from 'graphql';

import authorize from '../../authorize';
import schemaType from '../../types/schema';
import updateSchemaMutation from './update';
import RevisionModel from '../../../models/revision';

export default {
  type: schemaType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: new GraphQLNonNull(GraphQLID)
    },
    version: {
      name: 'version',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const {schemaId: _id, version: __v} = params;

    const revision = await RevisionModel.findOne({
      '_id._id': _id,
      '_id.__v': __v
    }).exec();

    return await updateSchemaMutation.resolve(root, {data: revision.doc}, options);
  }
};
