import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

const pageInputType = new GraphQLInputObjectType({
  name: 'PageInput',
  fields: {
    _id: {type: GraphQLID},
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
    title: {type: GraphQLString},
    data: {type: GraphQLJSON},
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID},
    template: {type: GraphQLID}
  }
});

export default pageInputType;
