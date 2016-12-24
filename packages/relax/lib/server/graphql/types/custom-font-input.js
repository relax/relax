import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'CustomFontInput',
  fields: {
    family: {
      type: new GraphQLNonNull(GraphQLString)
    },
    file: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});
