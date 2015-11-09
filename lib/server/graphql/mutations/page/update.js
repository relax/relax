import {
  GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import pageInputType from '../../types/page-input';
import pageType from '../../types/page';
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
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    const page = await PageModel.findById(params.data._id);

    const revision = new RevisionModel({
      _id: {
        _id: page._id,
        __v: page.__v
      },
      date: page.updatedDate,
      user: page.updatedBy,
      doc: page
    });

    await revision.save();

    const pageChanges = Object.assign({}, params.data, {
      __v: page.__v + 1,
      updatedDate: new Date()
    });

    if (params.data.data && typeof params.data.data === 'string') {
      pageChanges.data = JSON.parse(params.data.data);
    }

    const resultPage = await PageModel.findByIdAndUpdate(
      params.data._id,
      pageChanges,
      {upsert: true, new: true}
    ).select(projection).exec();

    if (!resultPage) {
      throw new Error('Error updating page');
    }
    return resultPage;
  }
};
