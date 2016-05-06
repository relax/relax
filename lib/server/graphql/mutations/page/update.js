import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import pageInputType from '../../types/page-input';
import pageType from '../../types/page';
import PageModel from '../../../models/page';
import RevisionModel from '../../../models/revision';

// Create revision async function
async function createRevision (page) {
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
}

// Update page async function
async function updatePage (id, changes, projection) {
  const currentPage = await PageModel.findById(id);
  await createRevision(currentPage);

  const pageChanges = Object.assign(
    {},
    changes,
    {
      __v: currentPage.__v + 1,
      updatedDate: new Date()
    }
  );

  const resultPage = await PageModel
    .findByIdAndUpdate(
      id,
      pageChanges,
      {upsert: true, new: true}
    )
    .select(projection);

  if (!resultPage) {
    throw new Error('Error updating page');
  }

  return resultPage;
}

export const updateTitle = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    return await updatePage(params.id, {title: params.title}, projection);
  }
};

export const updateSlug = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    return await updatePage(params.id, {slug: params.slug}, projection);
  }
};

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
