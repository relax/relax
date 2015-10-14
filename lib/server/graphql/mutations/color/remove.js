import {
  GraphQLNonNull
} from 'graphql';

import colorType from '../../types/color';
import colorInputType from '../../types/color-input';
import ColorModel from '../../../models/color';

export default {
  type: colorType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(colorInputType)
    }
  },
  resolve (root, params, options) {
    return ColorModel
      .findByIdAndRemove(
        params.data._id
      )
      .exec()
      .then((removedColor) => {
        if (!removedColor) {
          throw new Error('Color not found');
        }
        return removedColor;
      });
  }
};
