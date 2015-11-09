import Q from 'q';

import authorize from '../authorize';
import countType from '../types/count';
import PageModel from '../../models/page';

export default {
  type: countType,
  args: {},
  resolve (root, params, options) {
    authorize(root);

    return Q()
    .then(() => PageModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
