import getProjection from 'helpers/get-projection';
import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import authorize from '../../authorize';
import menuType from '../../types/menu';
import MenuModel from '../../../models/menu';

export default {
  type: menuType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    return await MenuModel.findById(params.id).select(projection).exec();
  }
};
