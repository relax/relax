import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import styleType from '../../types/style';
import StyleModel from '../../../models/style';

export default {
  type: new GraphQLList(styleType),
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return StyleModel.find().select(projection).exec();
  }
};
