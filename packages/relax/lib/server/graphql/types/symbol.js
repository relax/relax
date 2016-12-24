import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const symbolType = new GraphQLObjectType({
  name: 'Symbol',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    data: {
      type: GraphQLJSON
    }
  }
});

export default symbolType;
