import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const styleType = new GraphQLObjectType({
  name: 'Style',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    type: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: GraphQLString},
    options: {
      type: GraphQLJSON
    },
    displayOptions: {
      type: GraphQLJSON
    }
  }
});

export default styleType;
