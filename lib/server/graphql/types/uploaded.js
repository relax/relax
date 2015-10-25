import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const uploadedType = new GraphQLObjectType({
  name: 'UploadedFile',
  fields: {
    originalname: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    destination: { type: GraphQLString },
    filename: { type: GraphQLString },
    path: { type: GraphQLString },
    size: { type: GraphQLInt }
  }
});

export default uploadedType;
