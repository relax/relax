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
import {frontpage, notfound} from 'statics/settings-keys';

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
    const projection = getProjection(options.fieldASTs[0]);
    let result = false;

    // non admins can only published pages
    if (params.state !== 'published') {
      authorize(root);
    }

    if (params.slug || params._id) {
      const queryParams = {};

      // id or slug
      if (params._id) {
        queryParams._id = params._id;
      } else {
        queryParams.slug = params.slug;
      }

      // page state
      if (params.state) {
        queryParams.state = params.state;
      }

      result = await PageModel.findOne(queryParams).select(projection).exec();
    } else if (params.public) {
      const frontpageSetting = await SettingModel.findById(frontpage).exec();

      if (frontpageSetting) {
        result = await PageModel
          .findById(frontpageSetting.value)
          .select(projection)
          .exec();
      }
    }

    // 404 page
    if (!result && params.public) {
      const notfoundSetting = await SettingModel.findById(notfound).exec();

      if (notfoundSetting) {
        result = await PageModel
          .findById(notfoundSetting.value)
          .select(projection)
          .exec();
      }
    }

    if (!result) {
      throw new Error('page not found');
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
