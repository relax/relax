import path from 'path';
import rmdir from 'rimraf';
import Q from 'q';
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';

import authorize from '../../authorize';

export default {
  type: new GraphQLObjectType({
    name: 'removeCustomFont',
    fields: {
      id: {type: new GraphQLNonNull(GraphQLString)}
    }
  }),
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params) {
    authorize(root);

    const id = params.id;
    const fontsFolder = path.join(__dirname, '../../../../..', 'public/fonts', id);

    return Q
      .nfcall(rmdir, fontsFolder)
      .then(() => ({
        id
      }))
      .catch(() => {
        throw new Error('Error removing custom fonts folder');
      });
  }
};
