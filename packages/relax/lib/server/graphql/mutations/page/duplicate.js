import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import PageModel from '../../../models/page';

async function getUniqueSlug (slug, it) {
  const sufix = it > 0 ? `-${it}` : '';
  const resultSlug = `${slug}${sufix}`;

  const page = await PageModel
    .findOne({slug: resultSlug})
    .exec();

  let result;

  if (!page) {
    result = resultSlug;
  } else {
    result = await getUniqueSlug(slug, it + 1);
  }

  return result;
}

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params) {
    authorize(root);

    let page = await PageModel.findById(params.data).exec();

    if (!page) {
      throw new Error('Page to duplicate not found');
    }

    page = page.toJSON();

    const slug = await getUniqueSlug(`${page.slug}-copy`, 0);

    page.slug = slug;
    page.title += ' (copy)';
    page.state = 'draft';
    delete page._id;
    delete page.date;
    delete page.actions;
    const pageModel = new PageModel(page);

    const newPage = await pageModel.save();

    if (!newPage) {
      throw new Error('Error duplicating page');
    }
    return newPage;
  }
};
