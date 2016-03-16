import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    _id: {type: GraphQLString},
    username: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString},
    password: {type: GraphQLString},
    email: {type: GraphQLString},
    date: {type: GraphQLString}
  }
});

export default userInputType;
