import Q from 'q';

import authorize from '../authorize';
import countType from '../types/count';
import SchemaModel from '../../models/schema';

export default {
  type: countType,
  args: {},
  resolve (root, params, options) {
    authorize(root);

    return Q()
    .then(() => SchemaModel.count({}))
    .then((count) => {
      return {count};
    });
  }
};
