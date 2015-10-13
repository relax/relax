import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

var pageInputType = new GraphQLInputObjectType({
  name: 'PageInput',
  fields: {
    _id: {type: GraphQLID},
    slug: {type: GraphQLString},
    state: {type: GraphQLString},
    date: {
      type: GraphQLInt,
      resolve: () => {
        return Date.now();
      }
    },
    updatedDate: {
      type: GraphQLInt,
      resolve: () => {
        return Date.now();
      }
    },
    title: {type: GraphQLString},
    data: {type: GraphQLString},
    updatedBy: {type: GraphQLString},
    createdBy: {type: GraphQLString}
  }
});

export default pageInputType;
