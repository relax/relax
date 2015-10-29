import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
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
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID}
  }
});

export default pageInputType;
