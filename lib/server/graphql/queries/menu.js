import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import menuType from '../types/menu';
import MenuModel from '../../models/menu';

export default {
  type: menuType,
  args: {
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  resolve: (root, params, options) => {
    const projection = getProjection(options.fieldASTs[0]);
    return MenuModel.findOne(params).select(projection).exec();
  }
};
