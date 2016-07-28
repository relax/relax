import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString
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
    type: {
      type: GraphQLString
    },
    doc: {
      type: GraphQLJSON
    },
    actions: {
      type: GraphQLJSON
    }
  }
});
