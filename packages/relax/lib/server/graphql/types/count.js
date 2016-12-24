import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';

const countType = new GraphQLObjectType({
  name: 'Count',
  fields: {
    count: {type: GraphQLInt}
  }
});

export default countType;
