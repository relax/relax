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
import SettingModel from '../../../models/setting';
import PageModel from '../../../models/page';
import {notfound} from 'statics/settings-keys';

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
    },
    state: {
      name: 'state',
      type: GraphQLString
    },
    public: {
      name: 'public',
      type: GraphQLBoolean
    }
  },
  async resolve (root, params, options) {
    let schemaID = params.schemaId;
    let publicReadable = false;
    let schema;

    if (!schemaID) {
      schema = await SchemaModel
        .findOne({slug: params.schemaSlug})
        .select('_id publicReadable')
        .lean()
        .exec();
    } else {
      schema = await SchemaModel
        .findById(schemaID)
        .select('_id publicReadable')
        .lean()
        .exec();
    }

    if (!schema) {
      throw new Error('Could not find schema');
    }

    schemaID = schema._id;
    publicReadable = schema.publicReadable;

    if (!publicReadable || (schema.type === 'single' && params.state !== 'published')) {
      authorize(root);
    }

    const Model = await schemaEntryModel(schemaID);
    const projection = getProjection(options.fieldASTs[0]);
    const queryParams = {};

    // id or slug
    if (params.id) {
      queryParams._id = params.id;
    } else {
      queryParams.slug = params.schemaEntrySlug;
    }

    // page state
    if (params.state) {
      queryParams.state = params.state;
    }

    let result = await Model
      .findOne(queryParams)
      .select(projection)
      .exec();

    // return 404 page if public flag
    if (!result && params.public) {
      const notfoundSetting = await SettingModel.findById(notfound).exec();

      if (notfoundSetting) {
        result = await PageModel
          .findById(notfoundSetting.value)
          .select(projection)
          .exec();
      }
    }

    return result;
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
