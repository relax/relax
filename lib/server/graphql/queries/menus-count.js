import Q from 'q';

import authorize from '../authorize';
import countType from '../types/count';
import MenuModel from '../../models/menu';

export default {
  type: countType,
  args: {},
  resolve (root, params, options) {
    authorize(root);

    return Q()
    .then(() => MenuModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
