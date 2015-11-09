import {
  GraphQLList
} from 'graphql';
import {getProjection} from 'relax-framework';

import colorType from '../types/color';
import ColorModel from '../../models/color';

export default {
  type: new GraphQLList(colorType),
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return ColorModel.find().select(projection).exec();
  }
};
