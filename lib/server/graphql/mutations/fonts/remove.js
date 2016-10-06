import del from 'del';
import path from 'path';
import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

import authorize from '../../authorize';
import customFontInputType from '../../types/custom-font-input';

export default {
  type: GraphQLBoolean,
  args: {
    fonts: {
      name: 'fonts',
      type: new GraphQLNonNull(
        new GraphQLList(customFontInputType)
      )
    }
  },
  async resolve (root, params) {
    authorize(root);

    const fonts = params.fonts;

    for (const font of fonts) {
      try {
        await del(path.join('.', 'public', font.file));
      } catch (err) {
        console.log(err);
      }
    }

    return true;
  }
};
