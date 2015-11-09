import authorize from '../authorize';
import countType from '../types/count';
import MediaModel from '../../models/media';

export default {
  type: countType,
  args: {},
  async resolve (root, params, options) {
    authorize(root);

    const count = await MediaModel.count({});

    return {count};
  }
};
