import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const uploadedInputType = new GraphQLInputObjectType({
  name: 'UploadedFileInput',
  fields: {
    originalname: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    destination: { type: GraphQLString },
    filename: { type: GraphQLString },
    path: { type: GraphQLString },
    size: { type: GraphQLInt }
  }
});

export default uploadedInputType;
