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
    title: {type: GraphQLString},
    slug: {type: GraphQLString},
    __v: {type: GraphQLInt},
    date: {
      type: GraphQLFloat,
      resolve: () => {
        return Date.now();
      }
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve: () => {
        return Date.now();
      }
    },
    data: {type: GraphQLString},
    schemaLinks: {type: GraphQLString},
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID},
    properties: {type: GraphQLString}
  }
});

export default schemaInputType;
