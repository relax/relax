import Q from 'q';

import countType from '../types/count';
import UserModel from '../../models/user';

export default {
  type: countType,
  args: {},
  resolve: (root, params, options) => {
    return Q()
    .then(() => UserModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
