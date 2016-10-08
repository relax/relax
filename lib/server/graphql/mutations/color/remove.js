import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import colorType from '../../types/color';
import ColorModel from '../../../models/color';

export const removeColor = {
  type: colorType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedColor = await ColorModel
      .findByIdAndRemove(params.id, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!removedColor) {
      throw new Error('Color not found');
    }

    return removedColor;
  }
};

export const removeColors = {
  type: new GraphQLList(colorType),
  args: {
    ids: {
      name: 'ids',
      type: new GraphQLNonNull(
        new GraphQLList(GraphQLID)
      )
    }
  },
  async resolve (root, params) {
    authorize(root);

    const {ids} = params;
    const removedColors = await ColorModel.remove({
      _id: {
        $in: ids
      }
    });

    return removedColors.result.ok && ids.map(_id => ({_id})) || [];
  }
};
