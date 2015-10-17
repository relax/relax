import {
  GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../authorize';
import colorType from '../types/color';
import ColorModel from '../../models/color';

export default {
  type: new GraphQLList(colorType),
  args: {},
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    return ColorModel.find().select(projection).exec();
  }
};
