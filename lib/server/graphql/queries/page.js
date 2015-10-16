import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {getProjection} from 'relax-framework';

import pageType from '../types/page';
import PageModel from '../../models/page';

export default {
  type: pageType,
  args: {
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return PageModel.findOne(params).select(projection).exec();
  }
};

export const validateSlug = {
  type: GraphQLBoolean,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    },
    pageId: {
      name: 'pageId',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, {slug, pageId}) {
    return await PageModel.count({
      slug,
      _id: {
        $ne: pageId
      }
    }) === 0;
  }
};
