import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
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
    authorize(root);

    const color = new ColorModel(params.data);

    return Q()
      .then(() => color.save())
      .then((newColor) => {
        if (!newColor) {
          throw new Error('Error adding new color');
        }
        return newColor;
      });
  }
};
