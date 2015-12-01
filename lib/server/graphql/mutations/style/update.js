import {
  GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import parsableFields from './parsable-fields';
import parseFields from '../../../../helpers/parse-fields';
import styleInputType from '../../types/style-input';
import styleType from '../../types/style';
import StyleModel from '../../../models/style';

export default {
  type: styleType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(styleInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const data = parseFields(params.data, parsableFields);
    const resultStyle = await StyleModel
      .findByIdAndUpdate(data._id, data, {
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
