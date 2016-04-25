import getProjection from 'helpers/get-projection';
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
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    const menuChanges = Object.assign({}, params.data);
    const id = params.data._id;

    // data hidrate
    if (params.data.data && typeof params.data.data === 'string') {
      menuChanges.data = JSON.parse(params.data.data);
    }

    return MenuModel
      .findByIdAndUpdate(
        id,
        menuChanges,
        {upsert: true, new: true}
      )
      .select(projection)
      .exec()
      .then((resultMenu) => {
        if (!resultMenu) {
          throw new Error('Menu not found');
        }
        return resultMenu;
      });
  }
};
