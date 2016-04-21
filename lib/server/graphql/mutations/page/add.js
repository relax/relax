import getUniqueSlug from 'helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import pageInputType from '../../types/page-input';
import pageType from '../../types/page';
import PageModel from '../../../models/page';

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const pageData = Object.assign({}, params.data);

    // Generate slug if needed
    if (!pageData.slug) {
      pageData.slug = await getUniqueSlug(PageModel, pageData.title);
    }

    // Add user info
    pageData.createdBy = root.user._id;
    pageData.updatedBy = root.user._id;

    const pageModel = new PageModel(pageData);
    const page = await pageModel.save();

    if (!page) {
      throw new Error('Error creating page');
    }

    return page;
  }
};
