import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'InputFile',
  fields: {
    file: {type: new GraphQLNonNull(GraphQLString)},
    filename: {type: new GraphQLNonNull(GraphQLString)}
  }
});
