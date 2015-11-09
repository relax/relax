import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import Q from 'q';
import mongoose from 'mongoose';
import path from 'path';
import mkdirp from 'mkdirp';
import forEach from 'lodash.foreach';
import fs from 'fs';

import authorize from '../../authorize';
import uploadedInputType from '../../types/uploaded-input';
import customFontType from '../../types/custom-font';

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
  resolve (root, params, options) {
    authorize(root);

    const files = params.files;
    const types = params.types;
    const id = mongoose.Types.ObjectId().toString();
    const rootFolder = path.join(__dirname, '../../../../..');
    const fontsFolder = path.join(rootFolder, 'public/fonts', id);

    return Q
      .nfcall(mkdirp, fontsFolder)
      .then(() => {
        const promises = [];

        forEach(files, (file) => {
          promises.push(
            Q.ninvoke(fs, 'rename', path.join(rootFolder, file.path), path.join(fontsFolder, file.originalname))
          );
        });

        return Q.all(promises);
      })
      .then(() => {
        // map types to file
        const map = {};
        for (var a = 0; a < files.length; a++) {
          map[types[a]] = files[a].originalname;
        }

        return {
          family: params.name,
          id,
          files: map
        };
      })
      .catch((error) => {
        throw new Error('Error submiting custom fonts');
      });
  }
};
