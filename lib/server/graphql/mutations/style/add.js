import parseFields from 'helpers/parse-fields';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import parsableFields from './parsable-fields';
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
  async resolve (root, params) {
    authorize(root);

    const data = parseFields(params.data, parsableFields);
    const styleModel = new StyleModel(data);

    const style = await styleModel.save();

    if (!style) {
      throw new Error('Style not found');
    }
    return style;
  }
};
