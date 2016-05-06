import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';

import authorize from '../../authorize';
import pageType from '../../types/page';
import DraftModel from '../../../models/draft';
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

export const updateFromDraft = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = {};
    const data = JSON.parse(params.data);

    const page = await updatePage(params.id, {data}, projection);
    const draft = await DraftModel
      .findByIdAndUpdate(
        {_id: new Types.ObjectId(params.id), _userId: root.user._id},
        {__v: page.__v, data, actions: []},
        {upsert: true, new: true}
      );

    return {
      page,
      draft
    };
  }
};
