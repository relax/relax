import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: pageType,
  args: {
    _id: {
      name: '_id',
      type: GraphQLString
    },
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return await PageModel.findOne(params).select(projection).exec();
  }
};

export const validatePageSlug = {
  type: GraphQLBoolean,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    },
    pageId: {
      name: 'pageId',
      type: GraphQLID
    }
  },
  async resolve (root, {slug, pageId}) {
    authorize(root);

    return await PageModel.count({
      slug,
      _id: {
        $ne: pageId
      }
    }) === 0;
  }
};
