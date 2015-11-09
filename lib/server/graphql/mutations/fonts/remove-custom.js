import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';
import Q from 'q';
import path from 'path';
import rmdir from 'rimraf';
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
  resolve (root, params, options) {
    authorize(root);

    const id = params.id;
    const fontsFolder = path.join(__dirname, '../../../../..', 'public/fonts', id);

    return Q
      .nfcall(rmdir, fontsFolder)
      .then(() => {
        return {
          id
        };
      })
      .catch((error) => {
        throw new Error('Error removing custom fonts folder');
      });
  }
};
