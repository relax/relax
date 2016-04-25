import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

const menuInputType = new GraphQLInputObjectType({
  name: 'MenuInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    date: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    updatedBy: {type: GraphQLString},
    createdBy: {type: GraphQLString},
    data: {type: GraphQLString}
  }
});

export default menuInputType;
