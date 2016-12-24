import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const mediaInputType = new GraphQLInputObjectType({
  name: 'MediaInput',
  fields: {
    file: {
      type: new GraphQLInputObjectType({
        name: 'MediaInputFile',
        fields: {
          file: {type: new GraphQLNonNull(GraphQLString)},
          filename: {type: new GraphQLNonNull(GraphQLString)}
        }
      })
    }
  }
});

export default mediaInputType;
