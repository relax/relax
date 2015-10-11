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
    updatedDate: {
      type: GraphQLInt,
      resolve: () => {
        return Date.now();
      }
    },
    title: {type: GraphQLString},
    updatedBy: {type: GraphQLString}
  }
});

export default pageInputType;
