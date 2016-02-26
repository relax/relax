import slugify from 'slug';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import pageInputType from '../../types/page-input';
import pageType from '../../types/page';
import PageModel from '../../../models/page';

async function iterateSlug (slug) {
  console.log(slug);
  const exists = await PageModel.count({slug});
  return {
    exists,
    slug
  };
}

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const pageData = Object.assign({}, params.data);

    // Generate slug if needed
    if (!pageData.slug) {
      let generatedSlug = slugify(pageData.title).toLowerCase();
      const exists = await PageModel.count({slug: generatedSlug});

      if (exists) {
        let result;
        let counter = 1;
        do {
          result = await iterateSlug(`${generatedSlug}-${counter}`);
          counter++;
        } while (result.exists);

        generatedSlug = result.slug;
      }

      pageData.slug = generatedSlug;
    }

    const pageModel = new PageModel(pageData);
    const page = await pageModel.save();

    if (!page) {
      throw new Error('Error creating page');
    }

    return page;
  }
};
