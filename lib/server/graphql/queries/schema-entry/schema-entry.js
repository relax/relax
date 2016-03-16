import getProjection from 'helpers/get-projection';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaEntryModel from '../../../models/schema-entry';
import schemaEntryType from '../../types/schema-entry';

export default {
  type: schemaEntryType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    },
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    }
  },
  async resolve (root, {schemaId, id}, options) {
    const Model = await schemaEntryModel(schemaId);

    const projection = getProjection(options.fieldASTs[0]);
    return await Model.findById(id).select(projection).exec();
  }
};

export const validateSchemaEntrySlug = {
  type: GraphQLBoolean,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    },
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    },
    schemaEntryId: {
      name: 'schemaEntryId',
      type: GraphQLID
    }
  },
  async resolve (root, {slug, schemaId, schemaEntryId}) {
    authorize(root);

    const Model = await schemaEntryModel(schemaId);

    return await Model.count({
      slug,
      _id: {
        $ne: schemaEntryId
      }
    }) === 0;
  }
};
