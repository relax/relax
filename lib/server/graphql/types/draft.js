import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Draft',
  fields: {
    _id: {
      type: GraphQLID
    },
    itemId: {
      type: GraphQLID
    },
    userId: {
      type: GraphQLID
    },
    __v: {
      type: GraphQLInt
    },
    data: {
      type: GraphQLString,
      resolve: (draft) => JSON.stringify(draft.data)
    },
    actions: {
      type: GraphQLString,
      resolve: (draft) => JSON.stringify(draft.actions)
    },
    schemaLinks: {
      type: GraphQLString,
      resolve: (draft) => JSON.stringify(draft.schemaLinks)
    }
  }
});
