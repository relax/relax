import {
  GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

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

    const projection = getProjection(options.fieldASTs[0]);

    return MenuModel
      .findByIdAndUpdate(
        params.data._id,
        params.data,
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
