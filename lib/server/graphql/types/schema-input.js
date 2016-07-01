import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
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
    date: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    data: {type: GraphQLJSON},
    schemaLinks: {type: GraphQLJSON},
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID},
    properties: {type: GraphQLJSON}
  }
});

export default schemaInputType;
