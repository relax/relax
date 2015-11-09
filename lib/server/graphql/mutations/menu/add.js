import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import menuType from '../../types/menu';
import menuInputType from '../../types/menu-input';
import MenuModel from '../../../models/menu';

export default {
  type: menuType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(menuInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const menu = new MenuModel(params.data);

    return Q()
      .then(() => menu.save())
      .then((newMenu) => {
        if (!newMenu) {
          throw new Error('Error adding menu');
        }
        return newMenu;
      });
  }
};
