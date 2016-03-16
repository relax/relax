import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'SchemaEntryInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    slug: {type: GraphQLString},
    __v: {type: GraphQLInt},
    state: {type: GraphQLString},
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
    data: {type: GraphQLString},
    properties: {type: GraphQLString}
  }
});
