import Q from 'q';

import authorize from '../authorize';
import countType from '../types/count';
import UserModel from '../../models/user';

export default {
  type: countType,
  args: {},
  resolve (root, params, options) {
    authorize(root);

    return Q()
    .then(() => UserModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
