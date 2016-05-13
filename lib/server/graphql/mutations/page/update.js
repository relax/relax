import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';

import authorize from '../../authorize';
import pageType from '../../types/page';
import updatePage from './helpers/update-page';
import DraftModel from '../../../models/draft';

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
    const {page} = await updatePage(params.id, {title: params.title}, projection, root.user._id);
    return page;
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
    const {page} = await updatePage(params.id, {slug: params.slug}, projection, root.user._id);
    return page;
  }
};

export const updateState = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    state: {
      name: 'state',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {page} = await updatePage(params.id, {state: params.state}, projection, root.user._id);
    return page;
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
    const projection = getProjection(options.fieldASTs[0]);
    const data = JSON.parse(params.data);
    const {page} = await updatePage(params.id, {data}, projection, root.user._id);

    await DraftModel
      .findOneAndUpdate(
        {itemId: new Types.ObjectId(params.id)},
        {__v: page.__v, data, actions: []},
        {upsert: true, new: true}
      );

    return page;
  }
};
