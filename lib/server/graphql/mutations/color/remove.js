import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import colorType from '../../types/color';
import ColorModel from '../../../models/color';

export default {
  type: colorType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedColor = await ColorModel
      .findByIdAndRemove(params.id, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!removedColor) {
      throw new Error('Color not found');
    }

    return removedColor;
  }
};
