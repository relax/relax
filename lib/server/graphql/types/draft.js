import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import draftIdType from './draft-id';

export default new GraphQLObjectType({
  name: 'Draft',
  fields: {
    _id: {
      type: new GraphQLNonNull(draftIdType)
    },
    __v: {
      type: GraphQLInt
    },
    data: {
      type: GraphQLString,
      resolve: (draft, params, options) => {
        return JSON.stringify(draft.data);
      }
    },
    actions: {
      type: GraphQLString,
      resolve: (draft, params, options) => {
        return JSON.stringify(draft.actions);
      }
    },
    schemaLinks: {
      type: GraphQLString,
      resolve: (draft, params, options) => {
        return JSON.stringify(draft.schemaLinks);
      }
    }
  }
});
