import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import menuType from '../types/menu';
import MenuModel from '../../models/menu';

export default {
  type: menuType,
  args: {
    _id: {
      name: '_id',
      type: GraphQLID
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    return await MenuModel.findById(params._id).select(projection).exec();
  }
};

export const validateMenuSlug = {
  type: GraphQLBoolean,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    },
    menuId: {
      name: 'menuId',
      type: GraphQLID
    }
  },
  async resolve (root, {slug, menuId}) {
    authorize(root);

    return await MenuModel.count({
      slug,
      _id: {
        $ne: menuId
      }
    }) === 0;
  }
};
