import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

const schemaInputType = new GraphQLInputObjectType({
  name: 'SchemaInput',
  fields: {
    _id: {type: GraphQLString},
    __v: {type: GraphQLInt},
    title: {type: GraphQLString},
    slug: {type: GraphQLString},
    type: {type: GraphQLString},
    publicReadable: {type: GraphQLBoolean},
    publicWritable: {type: GraphQLBoolean},
    date: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID},
    properties: {type: GraphQLJSON},
    template: {type: GraphQLID}
  }
});

export default schemaInputType;
