import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const draftInputType = new GraphQLInputObjectType({
  name: 'DraftInput',
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
      type: GraphQLString
    },
    actions: {
      type: GraphQLString
    },
    schemaLinks: {
      type: GraphQLString
    }
  }
});

export default draftInputType;
