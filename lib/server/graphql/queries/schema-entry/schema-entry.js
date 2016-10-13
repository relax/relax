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
    let publicReadable = false;
    let schema;

    if (!schemaId) {
      schema = await SchemaModel
        .findOne({slug: schemaSlug})
        .select('_id publicReadable')
        .lean()
        .exec();
    } else {
      schema = await SchemaModel
        .findById(schemaId)
        .select('_id publicReadable')
        .lean()
        .exec();
    }

    if (!schema) {
      throw new Error('Could not find schema');
    }

    schemaID = schema._id;
    publicReadable = schema.publicReadable;

    if (!publicReadable) {
      authorize(root);
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
