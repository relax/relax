import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import styleType from '../../types/style';
import StyleModel from '../../../models/style';

export default {
  type: styleType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedStyle = await StyleModel
      .findByIdAndRemove(params.id, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!removedStyle) {
      throw new Error('Style not found');
    }

    return removedStyle;
  }
};
