import Q from 'q';
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
  resolve (root, params, options) {
    authorize(root);

    const data = Object.assign({}, params.data, {
      options: JSON.parse(params.data.options)
    });
    const style = new StyleModel(data);

    return Q()
      .then(() => style.save())
      .then((newStyle) => {
        if (!newStyle) {
          throw new Error('Style not found');
        }
        return newStyle;
      });
  }
};
