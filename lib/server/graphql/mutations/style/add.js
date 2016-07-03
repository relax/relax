import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
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

    const styleModel = new StyleModel(params.data);

    const style = await styleModel.save();

    if (!style) {
      throw new Error('Style not found');
    }
    return style;
  }
};
