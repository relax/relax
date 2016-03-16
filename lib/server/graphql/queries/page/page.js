import getProjection from 'helpers/get-projection';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import PageModel from '../../../models/page';
import SettingModel from '../../../models/setting';

export default {
  type: pageType,
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
    let result = false;

    if (params.slug || params._id) {
      result = await PageModel.findOne(params).select(projection).exec();
    } else {
      const frontpage = await SettingModel.findById('frontpage').exec();
      if (!frontpage) {
        throw new Error('Frontpage not defined');
      }
      result = await PageModel.findById(frontpage.value).select(projection).exec();
    }
    return result;
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
