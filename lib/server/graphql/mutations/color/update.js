import {
  GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import colorInputType from '../../types/color-input';
import colorType from '../../types/color';
import ColorModel from '../../../models/color';

export default {
  type: colorType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(colorInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const resultColor = await ColorModel
      .findByIdAndUpdate(params.data._id, params.data, {
        upsert: true,
        new: true,
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!resultColor) {
      throw new Error('Color not found');
    }

    return resultColor;
  }
};
