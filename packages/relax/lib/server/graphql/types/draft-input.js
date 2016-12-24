import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean
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
    doc: {
      type: GraphQLJSON
    },
    actions: {
      type: GraphQLJSON
    },
    restored: {
      type: GraphQLBoolean
    }
  }
});

export default draftInputType;
