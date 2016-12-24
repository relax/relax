import path from 'path';
import writeFile from 'helpers/write-file';
import {GraphQLNonNull} from 'graphql';

import authorize from '../../authorize';
import customFontType from '../../types/custom-font';
import InputFile from '../../types/input-file';

export default {
  type: customFontType,
  args: {
    file: {
      name: 'file',
      type: new GraphQLNonNull(InputFile)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const file = params.file;

    // check if is ttf / otf
    if (file.filename.indexOf('.ttf') === -1 && file.filename.indexOf('.otf') === -1) {
      throw new Error('Expected font format .ttf or .otf');
    }

    // font family name
    const family = file.filename.replace('.ttf', '').replace('.otf', '');

    // write file
    const fontPath = path.join('.', 'public', 'fonts', 'custom');
    const fileResult = await writeFile(file, fontPath);

    return {
      family,
      file: path.join('fonts', 'custom', fileResult.filename)
    };
  }
};
