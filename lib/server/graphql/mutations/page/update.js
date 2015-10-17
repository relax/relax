import {
  GraphQLNonNull
} from 'graphql';

import {getProjection} from 'relax-framework';
import Q from 'q';

import authorize from '../../authorize';
import pageType from '../../types/page';
import pageInputType from '../../types/page-input';
import PageModel from '../../../models/page';
import RevisionModel from '../../../models/revision';

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    var page;

    return PageModel
      .findById(params.data._id)
      .then((_page) => {
        page = _page;

        const revision = new RevisionModel({
          _id: {
            _id: page._id,
            __v: page.__v
          },
          date: page.updatedDate,
          user: page.updatedBy,
          doc: page
        });

        return Q.ninvoke(revision, 'save');
      })
      .then(() => {
        params.data.__v = page.__v + 1;
        params.data.updatedDate = new Date();

        return PageModel
          .findByIdAndUpdate(
            params.data._id,
            params.data,
            {upsert: true, new: true}
          )
          .select(projection)
          .exec();
      })
      .then((resultPage) => {
        if (!resultPage) {
          throw new Error('Page not found');
        }
        return resultPage;
      });
  }
};
