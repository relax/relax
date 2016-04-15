import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import menuType from '../../types/menu';
import MenuModel from '../../../models/menu';

export default {
  type: menuType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params) {
    authorize(root);

    return MenuModel
      .findByIdAndRemove(params.id)
      .exec()
      .then((removedMenu) => {
        if (!removedMenu) {
          throw new Error('Error removing menu');
        }
        return removedMenu;
      });
  }
};
