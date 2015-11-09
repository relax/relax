import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import PageModel from '../../../models/page';

function getUniqueSlug (slug, it) {
  const resultSlug = slug + (it > 0 ? '-' + it : '');
  return PageModel
    .findOne({slug: resultSlug})
    .exec()
    .then((response) => {
      let result;
      if (!response) {
        result = resultSlug;
      } else {
        result = getUniqueSlug(slug, it + 1);
      }
      return result;
    });
}

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    var page;

    return PageModel
      .findById(params.data)
      .then((_page) => {
        if (!_page) {
          throw new Error('Page to duplicate not found');
        }
        page = _page.toJSON();
        return getUniqueSlug(page.slug + '-copy', 0);
      })
      .then((slug) => {
        page.slug = slug;
        page.title += ' (copy)';
        page.state = 'draft';
        delete page._id;
        delete page.date;
        delete page.actions;
        const pageModel = new PageModel(page);

        return pageModel.save();
      })
      .then((newPage) => {
        if (!newPage) {
          throw new Error('Page not found');
        }
        return newPage;
      });
  }
};
