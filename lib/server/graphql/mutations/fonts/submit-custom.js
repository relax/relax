import fs from 'fs';
import mkdirp from 'mkdirp';
import mongoose from 'mongoose';
import path from 'path';
import {promisify, all} from 'bluebird';
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import customFontType from '../../types/custom-font';
import uploadedInputType from '../../types/uploaded-input';

export default {
  type: customFontType,
  args: {
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString)
    },
    files: {
      name: 'files',
      type: new GraphQLNonNull(new GraphQLList(uploadedInputType))
    },
    types: {
      name: 'types',
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    }
  },
  resolve (root, params) {
    authorize(root);

    const files = params.files;
    const types = params.types;
    const id = mongoose.Types.ObjectId().toString();
    const rootFolder = path.join(__dirname, '../../../../..');
    const fontsFolder = path.join(rootFolder, 'public/fonts', id);

    return promisify(mkdirp)(fontsFolder)
      .then(() =>
        all(files, file =>
          promisify(fs.rename)(
            path.join(rootFolder, file.path),
            path.join(fontsFolder, file.originalname)
          )
        )
      )
      .then(() => {
        // map types to file
        const map = {};
        for (let a = 0; a < files.length; a++) {
          map[types[a]] = files[a].originalname;
        }

        return {
          family: params.name,
          id,
          files: map
        };
      })
      .catch(() => {
        throw new Error('Error submiting custom fonts');
      });
  }
};
