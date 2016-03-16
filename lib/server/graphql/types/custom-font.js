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
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    files: {
      type: new GraphQLObjectType({
        name: 'CustomFontFiles',
        fields: {
          eot: {type: new GraphQLNonNull(GraphQLString)},
          woff2: {type: GraphQLString},
          woff: {type: new GraphQLNonNull(GraphQLString)},
          ttf: {type: new GraphQLNonNull(GraphQLString)}
        }
      })
    }
  }
});

export default customFontType;
