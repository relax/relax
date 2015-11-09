import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    date: {type: GraphQLString}
  }
});

export default userType;
