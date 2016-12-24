import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import styleInputType from '../../types/style-input';
import styleType from '../../types/style';
import StyleModel from '../../../models/style';

export default {
  type: styleType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(styleInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const data = params.data;
    const resultStyle = await StyleModel
      .findByIdAndUpdate(params.id, data, {
        upsert: true,
        new: true,
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!resultStyle) {
      throw new Error('Style not found');
    }

    return resultStyle;
  }
};
