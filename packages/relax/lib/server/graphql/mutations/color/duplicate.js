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
  async resolve (root, params) {
    authorize(root);

    const colorToDuplicate = await ColorModel.findById(params.id).select('-_id label value').exec();

    if (!colorToDuplicate) {
      throw new Error('Color to duplicate could not be found!');
    }

    const color = new ColorModel(colorToDuplicate.toJSON());
    const newColor = await color.save();

    if (!newColor) {
      throw new Error('Error adding new duplicate color');
    }

    return newColor;
  }
};
