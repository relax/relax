import Q from 'q';

import countType from '../types/count';
import MenuModel from '../../models/menu';

export default {
  type: countType,
  args: {},
  resolve: (root, params, options) => {
    return Q()
    .then(() => MenuModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
