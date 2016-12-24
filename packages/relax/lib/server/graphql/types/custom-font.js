import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const customFontType = new GraphQLObjectType({
  name: 'CustomFont',
  fields: {
    family: {
      type: new GraphQLNonNull(GraphQLString)
    },
    file: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export default customFontType;
