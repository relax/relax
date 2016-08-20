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
import SchemaModel from '../../../models/schema';

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
    },
    schemaSlug: {
      name: 'schemaSlug',
      type: GraphQLString
    },
    schemaEntrySlug: {
      name: 'schemaEntrySlug',
      type: GraphQLString
    }
  },
  async resolve (root, {schemaId, id, schemaSlug, schemaEntrySlug}, options) {
    let schemaID = schemaId;

    if (!schemaId) {
      const schema = await SchemaModel
        .findOne({slug: schemaSlug})
        .select('_id')
        .lean()
        .exec();
      schemaID = schema._id;
    }

    const Model = await schemaEntryModel(schemaID);
    const projection = getProjection(options.fieldASTs[0]);

    let query;

    if (id) {
      query = Model.findById(id);
    } else {
      query = Model.findOne({slug: schemaEntrySlug});
    }

    return await query.select(projection).exec();
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
