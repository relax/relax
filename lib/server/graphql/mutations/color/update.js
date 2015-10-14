import {
  GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

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
    const projection = getProjection(options.fieldASTs[0]);

    return ColorModel
      .findByIdAndUpdate(
        params.data._id,
        params.data,
        {upsert: true, new: true}
      )
      .select(projection)
      .exec()
      .then((resultColor) => {
        if (!resultColor) {
          throw new Error('Color not found');
        }
        return resultColor;
      });
  }
};
