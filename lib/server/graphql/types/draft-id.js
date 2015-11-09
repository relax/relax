import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'DraftId',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    _userId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});
