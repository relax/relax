import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import menuInputType from '../../types/menu-input';
import menuType from '../../types/menu';
import MenuModel from '../../../models/menu';

export default {
  type: menuType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(menuInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const data = Object.assign(
      {
        data: {}
      },
      params.data
    );

    const menuModel = new MenuModel(data);
    const menu = await menuModel.save();

    if (!menu) {
      throw new Error('Error adding menu');
    }
    return menu;
  }
};
