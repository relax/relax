import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import colorType from '../../types/color';
import ColorModel from '../../../models/color';

export default {
  type: new GraphQLList(colorType),
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return ColorModel.find().select(projection).exec();
  }
};
