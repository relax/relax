import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

const sessionType = new GraphQLObjectType({
  name: 'Session',
  fields: {
    userId: {type: new GraphQLNonNull(GraphQLID)}
  }
});

export default sessionType;
