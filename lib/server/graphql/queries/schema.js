import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import schemaType from '../types/schema';
import SchemaModel from '../../models/schema';

export default {
  type: schemaType,
  args: {
    _id: {
      name: '_id',
      type: GraphQLID
    },
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return await SchemaModel.findOne(params).select(projection).exec();
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
