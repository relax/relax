import {
  GraphQLNonNull
} from 'graphql';

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
  async resolve (root, params) {
    authorize(root);

    const colorModel = new ColorModel(params.data);
    const color = await colorModel.save();

    if (!color) {
      throw new Error('Error adding new color');
    }

    return color;
  }
};
