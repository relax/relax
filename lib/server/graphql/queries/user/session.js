import {GraphQLBoolean} from 'graphql';

export default {
  type: GraphQLBoolean,
  resolve (root) {
    return root.isAuthenticated;
  }
};
