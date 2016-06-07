import getProjection from 'helpers/get-projection';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import schemaType from '../../types/schema';
import SchemaModel from '../../../models/schema';

export default {
  type: schemaType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    },
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    const query = {};

    if (params.id) {
      query._id = params.id;
    } else if (params.slug) {
      query.slug = params.slug;
    }

    return SchemaModel.findOne(query).select(projection).exec();
  }
};

export const validateSchemaSlug = {
  type: GraphQLBoolean,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    },
    schemaId: {
      name: 'schemaId',
      type: GraphQLID
    }
  },
  async resolve (root, {slug, schemaId}) {
    authorize(root);

    return await SchemaModel.count({
      slug,
      _id: {
        $ne: schemaId
      }
    }) === 0;
  }
};
