import {
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import countType from '../../types/count';
import schemaEntryModel from '../../../models/schema-entry';

export default {
  type: countType,
  args: {
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    }
  },
  async resolve (root, params) {
    authorize(root);

    const Model = await schemaEntryModel(params.schemaId);

    const count = await Model.count({}).exec();
    return {count};
  }
};
