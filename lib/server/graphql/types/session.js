import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

var userType = new GraphQLObjectType({
  name: 'Session',
  fields: {
    _id: {type: GraphQLNonNull(GraphQLString)},
    username: {type: GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLNonNull(GraphQLString)},
    email: {type: GraphQLNonNull(GraphQLString)}
  }
});

export default userType;
