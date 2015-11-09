import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'DraftIdInput',
  fields: {
    _id: {
      type: GraphQLString
    },
    _userId: {
      type: GraphQLString
    }
  }
});
