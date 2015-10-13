import Q from 'q';

import countType from '../types/count';
import PageModel from '../../models/page';

export default {
  type: countType,
  args: {},
  resolve: (root, params, options) => {
    return Q()
    .then(() => PageModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
