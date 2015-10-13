import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';

var countType = new GraphQLObjectType({
  name: 'Count',
  fields: {
    count: {type: GraphQLInt}
  }
});

export default countType;
